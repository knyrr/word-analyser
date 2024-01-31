import { useTable, useSortBy, usePagination } from "react-table"
import { useMemo } from "react"
import { WordCell } from "./WordCell"

export const Stats = ({ onAnalyse, onSelectLemma, onSelectWord }) => {
  const lemmas = onAnalyse.lemmas
  const words = onAnalyse.words
  const lemmaArray = []

  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i].toLowerCase()
    if (lemmaArray.find((obj) => obj.name === lemmas[i])) {
      const newObj = lemmaArray.find((obj) => obj.name === lemmas[i])
      newObj.count++
      if (newObj.items.find((item) => item[0] === currentWord)) {
        let k = newObj.items.findIndex((item) => item[0] === currentWord)
        newObj.items[k][1]++
      } else {
        let item = []
        item[0] = currentWord
        item[1] = 1
        newObj.items.push(item)
      }
      let j = lemmaArray.findIndex((obj) => obj.name === lemmas[i])
      lemmaArray[j] = newObj
    } else {
      const newObj = { name: "", items: [], count: 0 }
      newObj.name = lemmas[i]
      newObj.items[0] = [currentWord, 1]
      newObj.count = 1
      lemmaArray.push(newObj)
    }
  }

  const data = useMemo(
    () => [
      ...lemmaArray.sort((a, b) => {
        if (a.count === b.count && String(a.name).localeCompare(b.name) === 0) {
          return 0
        } else if (a.count !== b.count) {
          return b.count < a.count ? -1 : 1
        } else {
          return String(a.name).localeCompare(b.name) < 0 ? -1 : 1
        }
      }),
    ],
    []
  )

  const columns = useMemo(
    () => [
      {
        Header: "Algvormid",
        accessor: "name",
        Cell: (props: { value: string }) => {
          const word = props.value
          return (
            <span onClick={(e) => onSelectLemma(e.target.textContent)}>
              {word}
            </span>
          )
        },
      },
      {
        Header: "Sõnavormid",
        accessor: "items",
        Cell: (props: { value: Array }) => {
          const items = props.value
          const sortedItems = items.sort((a, b) => {
            if (String(a[0]).localeCompare(b[0]) === 0) {
              return 0
            } else {
              return String(a[0]).localeCompare(b[0]) < 0 ? -1 : 1
            }
          })
          let cellContent = []
          for (let i = 0; i < sortedItems.length; i++) {
            let word = sortedItems[i][0]
            let count = sortedItems[i][1]
            let content = (
              <WordCell
                key={word}
                onSelectWord={onSelectWord}
                sendWord={word}
                sendCount={count}
              />
            )
            cellContent.push(content)
          }
          return cellContent
        },
      },
      {
        Header: "Sagedus",
        accessor: "count",
      },
      {
        Header: "Osakaal",
        accessor: "ratio",
        Cell: (row) => {
          let content =
            Math.round((row.row.original.count / words.length) * 100 * 100) /
            100
          return <span>{content}%</span>
        },
      },
    ],
    [words, onSelectLemma, onSelectWord]
  )

  const tableInstance = useTable({ columns, data }, useSortBy, usePagination)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
  } = tableInstance

  const { pageIndex, pageSize } = state
  return (
    <>
      <table className="lemmaTable" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <span>
          <strong>
            {pageIndex + 1}/{pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Mine lehele:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{ width: "50px ", marginRight: "10px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Näita {pageSize} rida
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Eelmine
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Järgmine
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </>
  )
}
