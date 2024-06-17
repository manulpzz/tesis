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
      grupomodelo_id: "",
      category_id: "",
    },
  })

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <TextInput
        disabled
        mt="sm"
        label={translate("grupomodeloucts.fields.id")}
        {...getInputProps("id")}
      />
      <TextInput
        mt="sm"
        label={translate("grupomodeloucts.fields.name")}
        {...getInputProps("name")}
      />
      <NumberInput
        mt="sm"
        label={translate("grupomodeloucts.fields.quantity")}
        {...getInputProps("quantity")}
      />
      <TextInput
        mt="sm"
        label={translate("grupomodeloucts.fields.price")}
        {...getInputProps("price")}
      />
      <TextInput
        mt="sm"
        label={translate("grupomodeloucts.fields.grupomodelo")}
        {...getInputProps("grupomodelo_id")}
      />
      <TextInput
        mt="sm"
        label={translate("grupomodeloucts.fields.category")}
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
