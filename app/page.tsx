'use client'
import { useEffect, useState } from "react";
import CustomTable from "./components/table/Table";
import { columns } from "./data/columns";
import { data as fakeData } from "./data/data";
import useChecks from "./hooks/useChecks";

export default function Home() {

  const [data, setData] = useState(fakeData)
  const { checks, handleCheck, handleCheckAll, isItemChecked, initializeChecks } = useChecks();

  const styleRow = {
    '&:hover': {
      backgroundColor: '#eeeeee'
    },
  }

  const styleHeader = {
    // backgroundColor: '#000',
    color: '#000',
  }

  useEffect(() => {
    initializeChecks(data)
  },[data])

  return (
    <main>
      <div
        style={{ minHeight: '200px' }}
      >
        <CustomTable
          checkboxFunctions={{ isItemChecked, initializeChecks, checks, handleCheck, handleCheckAll}}
          checkbox={true}
          tableOptions={{ stickyHeader: true }}
          stylesRow={styleRow}
          stylesHeader={styleHeader}
          columns={columns}
          data={data}
        />
      </div>
    </main>
  );
}
