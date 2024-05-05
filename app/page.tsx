'use client'
import { useState } from "react";
import { columns } from "./data/columns";
import { data as fakeData } from "./data/data";
import TableCompound from "./components/compound/Table";
import { styleHeader, styleRow } from "./styles.table";

export default function Home() {

  const [data, setData] = useState(fakeData)

  return (
    <main>
      <div style={{ minHeight: '200px' }}>
        <TableCompound columns={columns} data={data} hasCheckboxes={true} hasOrder={true}>
          <TableCompound.Head stylesHeader={styleHeader} deafultOrder="asc" />
          <TableCompound.Body stylesRow={styleRow} />
        </TableCompound>
      </div>
    </main>
  );
}
