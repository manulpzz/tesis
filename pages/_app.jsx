import { Refine } from "@refinedev/core"
import { notificationProvider, RefineThemes, ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/mantine"
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier } from "@refinedev/nextjs-router"
import { Header } from "../src/components/header"
import { Global, MantineProvider } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"
import dataProvider from "@refinedev/simple-rest"
import { appWithTranslation, useTranslation } from "next-i18next"

function MyApp({ Component, pageProps }) {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />
    }
    return (
      <ThemedLayoutV2
        Header={() => <Header />}
        Title={({ collapsed }) => (
          <ThemedTitleV2
            collapsed={collapsed}
            text="Tesis"
          />
        )}
      >
        <Component {...pageProps} />
      </ThemedLayoutV2>
    )
  }

  const { t, i18n } = useTranslation()
  const i18nProvider = {
    translate: (key, params) => t(key, params),
    changeLocale: (lang) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  }

  return (
    <>
      <MantineProvider
        theme={{ ...RefineThemes.Blue, colorScheme: "light" }}
        withNormalizeCSS
        withGlobalStyles
      >
        <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
        <NotificationsProvider position="top-right">
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("/api")}
            notificationProvider={notificationProvider}
            i18nProvider={i18nProvider}
            resources={[
              {
                name: "products",
                list: "/products",
                create: "/products/create",
                edit: "/products/edit/:id",
                show: "/products/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "brands",
                list: "/brands",
                create: "/brands/create",
                edit: "/brands/edit/:id",
                show: "/brands/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "categories",
                list: "/categories",
                create: "/categories/create",
                edit: "/categories/edit/:id",
                show: "/categories/show/:id",
                meta: {
                  canDelete: true,
                },
              },
             
              {
                name: "manufacturers",
                list: "/manufacturers",
                create: "/manufacturers/create",
                edit: "/manufacturers/edit/:id",
                show: "/manufacturers/show/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            {renderComponent()}
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </NotificationsProvider>
      </MantineProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
