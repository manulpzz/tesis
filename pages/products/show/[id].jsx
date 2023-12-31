import { Title } from "@mantine/core"
import { useShow, useTranslate, useOne } from "@refinedev/core"
import { Show, NumberField, TextField } from "@refinedev/mantine"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function ProductShow() {
  const translate = useTranslate()
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

  const { data: brandData, isLoading: brandIsLoading } = useOne({
    resource: "brands",
    id: record?.brand_id || "",
    queryOptions: {
      enabled: !!record,
    },
  })

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category_id || "",
    queryOptions: {
      enabled: !!record,
    },
  })

  return (
    <Show isLoading={isLoading}>
      <Title mt="xs" order={5}>
        {translate("products.fields.id")}
      </Title>
      <TextField value={record?.id} />

      <Title my="xs" order={5}>
        {translate("products.fields.name")}
      </Title>
      <TextField value={record?.name} />

      <Title mt="xs" order={5}>
        {translate("products.fields.quantity")}
      </Title>
      <NumberField value={record?.quantity} />

      <Title mt="xs" order={5}>
        {translate("products.fields.price")}
      </Title>
      <NumberField value={record?.price} />

      <Title my="xs" order={5}>
        {translate("products.fields.brand")}
      </Title>
      {brandIsLoading ? <>Cargando...</> : <>{brandData?.data?.id}</>}

      <Title my="xs" order={5}>
        {translate("products.fields.category")}
      </Title>
      {categoryIsLoading ? <>Cargando...</> : <>{categoryData?.data?.id}</>}
    </Show>
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
