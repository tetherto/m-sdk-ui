import { Tabs, TabsContent, TabsList, TabsTrigger } from '@mining-sdk/core'

export const TabsPage = (): JSX.Element => {
  return (
    <section className="demo-section">
      <h2 className="demo-section__title">Tabs</h2>
      <div className="demo-section__tabs">
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Tab 1 content</TabsContent>
          <TabsContent value="tab2">Tab 2 content</TabsContent>
          <TabsContent value="tab3">Tab 3 content</TabsContent>
        </Tabs>
      </div>
      <div className="demo-section__tabs">
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger disabled value="tab2">
              Tab 2
            </TabsTrigger>
            <TabsTrigger disabled value="tab3">
              Tab 3
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Tab 1 content</TabsContent>
          <TabsContent value="tab2">Tab 2 content</TabsContent>
          <TabsContent value="tab3">Tab 3 content</TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
