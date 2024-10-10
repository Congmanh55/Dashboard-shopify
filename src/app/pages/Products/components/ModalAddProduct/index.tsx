import {
    Text,
    DropZone,
    Form,
    FormLayout,
    Frame,
    LegacyStack,
    Modal,
    TextContainer,
    TextField,
    Thumbnail,
    LegacyCard,
    Button,
} from "@shopify/polaris";
import { useState, useCallback, Dispatch, SetStateAction } from "react";
import "./styles.css";
import { NoteIcon } from "@shopify/polaris-icons";

interface Props {
    open: boolean;
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ModalAddProduct(props: Props) {
    const { open, setOpen } = props;
    const [files, setFiles] = useState<File[]>([]);
    const [product, setProduct] = useState("");
    const [rule, setRule] = useState("");
    const [errors, setErrors] = useState<{
        product?: string;
        rule?: string;
        image?: string;
    }>({});

    const handleDropZoneDrop = useCallback(
        (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) =>
            setFiles((files) => [...files, ...acceptedFiles]),
        []
    );

    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

    const fileUpload = !files.length && (
        <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />
    );

    const uploadedFiles = files.length > 0 && (
        <LegacyStack vertical>
            {files.map((file, index) => (
                <LegacyStack alignment="center" key={index}>
                    <Thumbnail
                        size="small"
                        alt={file.name}
                        source={
                            validImageTypes.includes(file.type)
                                ? window.URL.createObjectURL(file)
                                : NoteIcon
                        }
                    />
                    <div>
                        {file.name}{" "}
                        <Text variant="bodySm" as="p">
                            {file.size} bytes
                        </Text>
                    </div>
                </LegacyStack>
            ))}
        </LegacyStack>
    );

    const handleClose = useCallback(() => {
        setProduct("");
        setRule("");
        setFiles([]);
        setErrors({});
        setOpen?.(false);
    }, [setOpen, setProduct, setRule, setFiles, setErrors]);

    const handleSubmit = useCallback(() => {
        const newErrors: { product?: string; rule?: string; image?: string } = {};
        if (!product) {
            newErrors.product = "Product is required";
        }
        if (!rule) {
            newErrors.rule = "Rules is required";
        } else if (parseFloat(rule) < 0) {
            newErrors.rule = "Must be at least 0";
        }
        if (files.length === 0) {
            newErrors.image = "At least one image is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Thực hiện logic submit ở đây
        if (product && rule && files) {
            const lastUpdate = new Date();
            const formattedDate = lastUpdate.toISOString();
            const fileReaders = files.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(fileReaders)
                .then((fileStrings) => {
                    console.log("Submitted:", {
                        product,
                        rule,
                        fileStrings,
                        formattedDate,
                    });
                })
                .catch((error) => {
                    console.error("Error converting files:", error);
                });
        }
        // Reset trường nhập liệu
        handleClose();
    }, [product, rule, files, handleClose, setOpen]);

    const handleProductChange = useCallback((value: string) => {
        setProduct(value);
        setErrors((prev) => ({ ...prev, product: undefined }));
    }, []);

    const handleRuleChange = useCallback((value: string) => {
        setRule(value);
        setErrors((prev) => ({ ...prev, rule: undefined }));
    }, []);

    return (
        <div style={{ height: "500px", display: "none" }}>
            <Frame>
                <Modal
                    open={open}
                    onClose={handleClose}
                    title="Add Product"
                    primaryAction={{
                        content: "Save",
                        onAction: handleSubmit,
                    }}
                    secondaryActions={[
                        {
                            content: "Cancel",
                            onAction: handleClose,
                        },
                    ]}
                >
                    <Modal.Section>
                        <TextContainer>
                            <Form noValidate onSubmit={handleSubmit}>
                                <FormLayout>
                                    <TextField
                                        value={product}
                                        onChange={handleProductChange}
                                        label="Product"
                                        type="text"
                                        autoComplete="off"
                                        error={errors.product}
                                    />
                                    <TextField
                                        value={rule}
                                        onChange={handleRuleChange}
                                        label="Rules"
                                        type="number"
                                        autoComplete="off"
                                        error={errors.rule}
                                        min={0}
                                    />
                                    <DropZone
                                        label="Image"
                                        onDrop={handleDropZoneDrop}
                                        variableHeight
                                    >
                                        {uploadedFiles}
                                        {fileUpload}
                                    </DropZone>
                                    {errors.image && (
                                        <Text as="p" tone="critical">
                                            {errors.image}
                                        </Text>
                                    )}
                                </FormLayout>
                            </Form>
                        </TextContainer>
                    </Modal.Section>
                </Modal>
            </Frame>
        </div>
    );
}

export default ModalAddProduct;
