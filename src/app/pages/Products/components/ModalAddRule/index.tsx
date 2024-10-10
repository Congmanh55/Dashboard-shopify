import { Button, FormLayout, Frame, Modal, TextField } from "@shopify/polaris";
import { PlusIcon, DeleteIcon } from "@shopify/polaris-icons";
import { useState, useCallback, Dispatch, SetStateAction } from "react";

interface Props {
    openRule: boolean;
    setOpenRule?: Dispatch<SetStateAction<boolean>>;
}

export default function ModalAddRule(props: Props) {
    const { openRule, setOpenRule } = props;

    const [rules, setRules] = useState<
        { buyFrom: string; buyTo: string; discount: string }[]
    >([{ buyFrom: "", buyTo: "", discount: "" }]);

    const [titleCampaign, setTitleCampaign] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState<{
        titleCampaign?: string;
        startDate?: string;
        endDate?: string;
        rules?: string;
    }>({
        titleCampaign: undefined,
        startDate: undefined,
        endDate: undefined,
        rules: undefined,
    });

    const handleChange = useCallback(() => {
        setOpenRule?.(false);
        setTitleCampaign("")
        setErrors({});
        setStartDate("");
        setEndDate("");
        setRules([{ buyFrom: "", buyTo: "", discount: "" }]);
    }, [setOpenRule]);

    const handleAddRule = () => {
        setRules([...rules, { buyFrom: "", buyTo: "", discount: "" }]);
    };

    const handleDeleteRule = (index: number) => {
        const newRules = rules.filter((_, i) => i !== index);
        setRules(newRules);
    };

    const handleInputChange = (
        index: number,
        field: "buyFrom" | "buyTo" | "discount",
        value: string
    ) => {
        const newRules = rules.map((rule, i) =>
            i === index ? { ...rule, [field]: value } : rule
        );
        setRules(newRules);
    };

    const handleSave = () => {
        setErrors({
            titleCampaign: undefined,
            startDate: undefined,
            endDate: undefined,
            rules: undefined,
        });

        let hasError = false;

        if (!titleCampaign) {
            setErrors((prev) => ({
                ...prev,
                titleCampaign: "Title campaign is required",
            }));
            hasError = true;
        }
        if (!startDate) {
            setErrors((prev) => ({ ...prev, startDate: "Start date is required" }));
            hasError = true;
        }
        if (!endDate) {
            setErrors((prev) => ({ ...prev, endDate: "End date is required" }));
            hasError = true;
        }
        if (rules.some((rule) => !rule.buyFrom || !rule.buyTo || !rule.discount)) {
            setErrors((prev) => ({ ...prev, rules: "All rule fields are required" }));
            hasError = true;
        }

        if (!hasError) {
            console.log("Add rule", {
                titleCampaign,
                startDate,
                endDate,
                rules,
            });
            handleChange();
        }
    };

    return (
        <div style={{ height: "500px", display: "none" }}>
            <Frame>
                <Modal
                    open={openRule}
                    onClose={handleChange}
                    title="Add Rule"
                    primaryAction={{
                        content: "Save",
                        onAction: handleSave,
                    }}
                    secondaryActions={[
                        {
                            content: "Cancel",
                            onAction: handleChange,
                        },
                    ]}
                >
                    <Modal.Section>
                        <FormLayout>
                            <FormLayout.Group condensed>
                                <TextField
                                    label="Title campaign"
                                    value={titleCampaign}
                                    onChange={setTitleCampaign}
                                    autoComplete="off"
                                    error={errors.titleCampaign}
                                />
                                <TextField
                                    label="Start date"
                                    value={startDate}
                                    onChange={setStartDate}
                                    autoComplete="off"
                                    error={errors.startDate}
                                />
                                <TextField
                                    label="End date"
                                    value={endDate}
                                    onChange={setEndDate}
                                    autoComplete="off"
                                    error={errors.endDate}
                                />
                            </FormLayout.Group>
                            {rules.map((rule, index) => (
                                <div key={index} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                                    <div>
                                        <FormLayout.Group condensed>
                                            <TextField
                                                label="Buy from"
                                                value={rule.buyFrom}
                                                onChange={(value) =>
                                                    handleInputChange(index, "buyFrom", value)
                                                }
                                                autoComplete="off"
                                                error={rule.buyFrom === "" && errors.rules ? true : false}
                                            />
                                            <TextField
                                                label="Buy to"
                                                value={rule.buyTo}
                                                onChange={(value) =>
                                                    handleInputChange(index, "buyTo", value)
                                                }
                                                autoComplete="off"
                                                error={rule.buyTo === "" && errors.rules ? true : false}
                                            />
                                            <TextField
                                                label="Discount per item(%)"
                                                value={rule.discount}
                                                onChange={(value) =>
                                                    handleInputChange(index, "discount", value)
                                                }
                                                autoComplete="off"
                                                error={
                                                    rule.discount === "" && errors.rules ? true : false
                                                }
                                            />
                                        </FormLayout.Group>
                                    </div>
                                    <div style={{ paddingTop: "25px" }}>
                                        <Button
                                            icon={DeleteIcon}
                                            onClick={() => handleDeleteRule(index)}
                                            variant="secondary"
                                        />
                                    </div>
                                </div>
                            ))}

                            <Button icon={PlusIcon} variant="primary" onClick={handleAddRule}>
                                Add
                            </Button>
                            {errors.rules && (
                                <div style={{ color: "red", marginTop: "10px" }}>
                                    {errors.rules}
                                </div>
                            )}
                        </FormLayout>

                    </Modal.Section>
                </Modal>
            </Frame>
        </div>
    );
}
