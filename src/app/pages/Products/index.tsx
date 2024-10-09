import {
    TextField,
    IndexTable,
    LegacyCard,
    useIndexResourceState,
    Text,
    Badge,
    Button,
    Pagination,
    ButtonGroup,
    FormLayout,
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { fetchDataAndCreateMock } from "../../../mocks";
import { PlusIcon } from "@shopify/polaris-icons";
import ModalAddProduct from "./components/ModalAddProduct";
import "./styles.css";
import ModalAddRule from "./components/ModalAddRule";

interface Product {
    id: string;
    image: string;
    productTitle: string;
    rules: number;
    lastUpdate: string;
    status: string;
}

function IndexTableWithCustomColumns() {
    const [queryValue, setQueryValue] = useState("");
    const [open, setOPen] = useState(false);
    const [openRule, setOPenRule] = useState(false);
    const [data, setData] = useState<Product[]>([]);
    const [filteredData, setFilteredData] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const mockData = await fetchDataAndCreateMock();
            setData(mockData);
            setFilteredData(mockData);
        };
        fetchData();
    }, []);

    // Debounced search function
    const handleSearch = useCallback(
        debounce((searchText: string) => {
            if (searchText === "") {
                setFilteredData(data);
            } else {
                setFilteredData(
                    data.filter((product) =>
                        product.productTitle
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                    )
                );
            }
        }, 300),
        [data]
    );

    const handleSearchChange = (value: string) => {
        setQueryValue(value);
        handleSearch(value);
    };

    const handleButtonClick = useCallback(
        (index: number) => {
            if (activeButtonIndex === index) return;
            setActiveButtonIndex(index);
            filterData(index);
        },
        [activeButtonIndex, data]
    );

    const filterData = (index: number) => {
        switch (index) {
            case 0:
                setFilteredData(data);
                break;
            case 1:
                setFilteredData(data.filter((product) => product.rules === 0));
                break;
            case 2:
                setFilteredData(data.filter((product) => product.status === "Active"));
                break;
            default:
                setFilteredData(data);
        }
    };

    const handleClickAddProduct = () => {
        setOPen(true);
    };

    const handleClickAddRule = () => {
        setOPenRule(true);
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredData.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(
            filteredData as unknown as { [key: string]: unknown }[]
        );

    const rowMarkup = currentItems.map((product, index) => (
        <IndexTable.Row
            id={product.id}
            key={product.id}
            selected={selectedResources.includes(product.id)}
            position={index}
        >
            <IndexTable.Cell>
                <img
                    src={product.image}
                    alt={`Image of ${product.productTitle}`}
                    loading="lazy"
                    style={{ width: "50px", height: "50px" }}
                />
            </IndexTable.Cell>
            <IndexTable.Cell>
                <Text variant="bodyMd" fontWeight="bold" as="span">
                    {product.productTitle}
                </Text>
            </IndexTable.Cell>
            <IndexTable.Cell>{product.rules}</IndexTable.Cell>
            <IndexTable.Cell>{product.lastUpdate}</IndexTable.Cell>
            <IndexTable.Cell>
                <Badge tone={product.status === "Active" ? "success" : "enabled"}>
                    {product.status}
                </Badge>
            </IndexTable.Cell>
            <IndexTable.Cell>
                <Button onClick={handleClickAddRule} icon={PlusIcon} variant="primary">
                    Add rule
                </Button>
            </IndexTable.Cell>
        </IndexTable.Row>
    ));

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text variant="heading3xl" as="h2">
                    Products
                </Text>
                <div className="beautiful-button-container">
                    <Button onClick={handleClickAddProduct}>Add Product</Button>
                </div>
            </div>
            <div style={{ margin: "20px 0" }}>
                <LegacyCard>
                    <div style={{ padding: "10px" }}>
                        <FormLayout>
                            <FormLayout.Group>
                                <TextField
                                    label=""
                                    value={queryValue}
                                    onChange={handleSearchChange} // Handle search change
                                    placeholder="Search..."
                                    autoComplete="off"
                                />
                                <ButtonGroup variant="segmented">
                                    <Button
                                        pressed={activeButtonIndex === 0}
                                        onClick={() => handleButtonClick(0)}
                                    >
                                        All
                                    </Button>
                                    <Button
                                        pressed={activeButtonIndex === 1}
                                        onClick={() => handleButtonClick(1)}
                                    >
                                        No rule
                                    </Button>
                                    <Button
                                        pressed={activeButtonIndex === 2}
                                        onClick={() => handleButtonClick(2)}
                                    >
                                        Active
                                    </Button>
                                </ButtonGroup>
                            </FormLayout.Group>
                        </FormLayout>
                    </div>
                    <IndexTable
                        resourceName={{ singular: "product", plural: "products" }}
                        itemCount={filteredData.length}
                        selectedItemsCount={
                            allResourcesSelected ? "All" : selectedResources.length
                        }
                        onSelectionChange={handleSelectionChange}
                        headings={[
                            { title: "Image" },
                            { title: "Product" },
                            { title: "Rules" },
                            { title: "Last Update" },
                            { title: "Status" },
                            { title: "Action" },
                        ]}
                    >
                        {rowMarkup}
                    </IndexTable>
                </LegacyCard>
            </div>
            <Pagination
                hasPrevious={currentPage > 1}
                hasNext={currentPage < totalPages}
                onPrevious={() => setCurrentPage(currentPage - 1)}
                onNext={() => setCurrentPage(currentPage + 1)}
                label={`Page ${currentPage} of ${totalPages}`}
            />
            <ModalAddProduct open={open} setOpen={setOPen} />
            <ModalAddRule openRule={openRule} setOpenRule={setOPenRule} />
        </>
    );
}

export default IndexTableWithCustomColumns;
