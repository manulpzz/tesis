import { Title } from "@mantine/core"
import { useShow, useTranslate, useOne } from "@refinedev/core"
import { Show, NumberField, TextField } from "@refinedev/mantine"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function grupomodeloShow() {
  const translate = useTranslate()
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

  const { data: grupomodeloData, isLoading: grupomodeloIsLoading } = useOne({
    resource: "grupomodelos",
    id: record?.grupomodelo_id || "",
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
        {translate("grupomodelos.fields.id")}
      </Title>
      <TextField value={record?.id} />

      <Title my="xs" order={5}>
        {translate("grupomodelos.fields.name")}
      </Title>
      <TextField value={record?.name} />

      <Title mt="xs" order={5}>
        {translate("grupomodelos.fields.quantity")}
      </Title>
      <NumberField value={record?.quantity} />

      <Title mt="xs" order={5}>
        {translate("grupomodelos.fields.price")}
      </Title>
      <NumberField value={record?.price} />

      <Title my="xs" order={5}>
        {translate("grupomodelos.fields.grupomodelo")}
      </Title>
      {grupomodeloIsLoading ? <>Cargando...</> : <>{grupomodeloData?.data?.id}</>}

      <Title my="xs" order={5}>
        {translate("grupomodelos.fields.category")}
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
