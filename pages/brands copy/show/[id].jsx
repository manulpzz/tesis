import { Title } from "@mantine/core"
import { useShow, useTranslate } from "@refinedev/core"
import { Show, TextField } from "@refinedev/mantine"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function manufacturershow() {
  const translate = useTranslate()
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

  return (
    <Show isLoading={isLoading}>
      <Title mt="xs" order={5}>
        {translate("manufacturers.fields.id")}
      </Title>
      <TextField value={record?.id} />

      <Title mt="xs" order={5}>
        {translate("manufacturers.fields.name")}
      </Title>
      <TextField value={record?.name} />
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
