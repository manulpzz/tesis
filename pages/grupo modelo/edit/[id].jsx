import { NumberInput, TextInput } from "@mantine/core"
import { useTranslate } from "@refinedev/core"
import { Edit, useForm } from "@refinedev/mantine"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function grupomodeloEdit() {
  const translate = useTranslate()
  const {
    getInputProps,
    saveButtonProps,
    refineCore: { formLoading },
  } = useForm({
    initialValues: {
      id: "",
      name: "",
      quantity: "",
      price: "",
      brand_id: "",
      category_id: "",
    },
  })

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <TextInput
        disabled
        mt="sm"
        label={translate("products.fields.id")}
        {...getInputProps("id")}
      />
      <TextInput
        mt="sm"
        label={translate("products.fields.name")}
        {...getInputProps("name")}
      />
      <NumberInput
        mt="sm"
        label={translate("products.fields.quantity")}
        {...getInputProps("quantity")}
      />
      <TextInput
        mt="sm"
        label={translate("products.fields.price")}
        {...getInputProps("price")}
      />
      <TextInput
        mt="sm"
        label={translate("products.fields.brand")}
        {...getInputProps("brand_id")}
      />
      <TextInput
        mt="sm"
        label={translate("products.fields.category")}
        {...getInputProps("category_id")}
      />
    </Edit>
  )
}

export const getServerSideProps = async (context) => {
  const translateProps = await serverSideTranslations(context.locale ?? "es", [
    "common",
  ])
  return {
    props: {
      ...translateProps,
    },
  }
}
