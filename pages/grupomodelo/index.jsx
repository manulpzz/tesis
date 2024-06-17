import React from "react"
import { ScrollArea, Table, Pagination, Group } from "@mantine/core"
import { useTranslate, useMany } from "@refinedev/core"
import { useTable } from "@refinedev/react-table"
import { List, EditButton, ShowButton, DeleteButton } from "@refinedev/mantine"
import { flexRender } from "@tanstack/react-table"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function grupomodeloucstList() {
  const translate = useTranslate()
  const columns = React.useMemo(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: translate("grupomodelos.fields.id"),
      },
      {
        id: "name",
        accessorKey: "name",
        header: translate("grupomodelos.fields.name"),
      },
      {
        id: "quantity",
        accessorKey: "quantity",
        header: translate("grupomodelos.fields.quantity"),
      },
      {
        id: "price",
        accessorKey: "price",
        header: translate("grupomodelos.fields.price"),
      },
      {
        id: "grupomodelo_id",
        header: translate("grupomodelos.fields.grupomodelo"),
        accessorKey: "grupomodelo_id",
        cell: function render({ getValue, table }) {
          const grupomodelo = table.options.meta.grupomodeloData?.data?.find(
            (item) => item.id == getValue(),
          )
          return grupomodelo?.id ?? "Cargando..."
        },
      },
      {
        id: "category_id",
        header: translate("grupomodelos.fields.category"),
        accessorKey: "category_id",
        cell: function render({ getValue, table }) {
          const category = table.options.meta.categoryData?.data?.find(
            (item) => item.id == getValue(),
          )
          return category?.id ?? "Cargando..."
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: translate("table.actions"),
        cell: function render({ getValue }) {
          return (
            <Group spacing="xs" noWrap>
              <ShowButton hideText recordItemId={getValue()}/>
              <EditButton hideText recordItemId={getValue()}/>
              <DeleteButton hideText recordItemId={getValue()}/>
            </Group>
          )
        },
      },
    ],
    [translate],
  )

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData },
    },
  } = useTable({columns})

  const { data: grupomodeloData } = useMany({
    resource: "grupomodelos",
    ids: tableData?.data?.map((item) => item?.grupomodelo_id) ?? [],
    queryOptions: {
      enabled: !!tableData?.data,
    },
  })

  const { data: categoryData } = useMany({
    resource: "categories",
    ids: tableData?.data?.map((item) => item?.category_id) ?? [],
    queryOptions: {
      enabled: !!tableData?.data,
    },
  })

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoryData,
      grupomodeloData,
    },
  }))

  return (
    <List>
      <ScrollArea>
        <Table highlightOnHover>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </Table>
      </ScrollArea>
      <br/>
      <Pagination
        position="right"
        total={pageCount}
        page={current}
        onChange={setCurrent}
      />
    </List>
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
