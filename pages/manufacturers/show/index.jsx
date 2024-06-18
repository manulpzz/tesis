import React from "react"
import { useTranslate } from "@refinedev/core"
import { useTable } from "@refinedev/react-table"
import { flexRender } from "@tanstack/react-table"
import { ScrollArea, Table, Pagination, Group } from "@mantine/core"
import { List, EditButton, ShowButton, DeleteButton } from "@refinedev/mantine"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function manufacturersList() {
  const translate = useTranslate()
  const columns = React.useMemo(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: translate("manufacturers.fields.id"),
      },
      {
        id: "name",
        accessorKey: "name",
        header: translate("manufacturers.fields.name"),
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
    refineCore: {
      setCurrent,
      pageCount,
      current,
    },
  } = useTable({columns})

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
