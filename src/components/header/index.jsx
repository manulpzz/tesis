import { Flex, Header as MantineHeader, useMantineTheme } from "@mantine/core"
import { HamburgerMenu } from "@refinedev/mantine"
import React from "react"

export const Header = () => {
  const theme = useMantineTheme()
  const borderColor = theme.colors.gray[2]
  return (
    <MantineHeader
      zIndex={199}
      height={64}
      py={6}
      px="sm"
      sx={{
        borderBottom: `1px solid ${borderColor}`,
        position: `sticky`,
        top: 0,
        zIndex: 1,
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        sx={{
          height: "100%",
        }}
      >
        <HamburgerMenu />
      </Flex>
    </MantineHeader>
  )
}
