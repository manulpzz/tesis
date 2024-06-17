import { TextInput } from "@mantine/core";
import { useTranslate } from "@refinedev/core";
import { Create, useForm } from "@refinedev/mantine";
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function manufacturersCreate() {
  const translate = useTranslate()
  const {
    getInputProps,
    saveButtonProps,
    refineCore: { formLoading },
  } = useForm({
    initialValues: {
      id: "",
      name: "",
    },
  })

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <TextInput
        mt="sm"
        label={translate("categories.fields.id")}
        {...getInputProps("id")}
      />
      <TextInput
        mt="sm"
        label={translate("categories.fields.name")}
        {...getInputProps("name")}
      />
    </Create>
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
