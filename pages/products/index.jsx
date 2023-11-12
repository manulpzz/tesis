import React from "react"
import { ScrollArea, Table, Pagination, Group } from "@mantine/core"
import { useTranslate, useMany } from "@refinedev/core"
import { useTable } from "@refinedev/react-table"
import { List, EditButton, ShowButton, DeleteButton } from "@refinedev/mantine"
import { flexRender } from "@tanstack/react-table"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function ProducstList() {
  const translate = useTranslate()
  const columns = React.useMemo(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: translate("products.fields.id"),
      },
      {
        id: "name",
        accessorKey: "name",
        header: translate("products.fields.name"),
      },
      {
        id: "quantity",
        accessorKey: "quantity",
        header: translate("products.fields.quantity"),
      },
      {
        id: "price",
        accessorKey: "price",
        header: translate("products.fields.price"),
      },
      {
        id: "brand_id",
        header: translate("products.fields.brand"),
        accessorKey: "brand_id",
        cell: function render({ getValue, table }) {
          const brand = table.options.meta.brandData?.data?.find(
            (item) => item.id == getValue(),
          )
          return brand?.id ?? "Cargando..."
        },
      },
      {
        id: "category_id",
        header: translate("products.fields.category"),
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

  const { data: brandData } = useMany({
    resource: "brands",
    ids: tableData?.data?.map((item) => item?.brand_id) ?? [],
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
      brandData,
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
