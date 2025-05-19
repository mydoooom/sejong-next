import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Button } from '@mui/material'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { createColumnHelper } from '@tanstack/table-core'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MerchWithCategories } from "../../../../lib/useMerch"
import styles from './MerchTable.module.scss'

const columnHelper = createColumnHelper<MerchWithCategories>()

const columns = [
  columnHelper.accessor('image_url', {
    header: "Obrázek",
    cell: info => (
      <Image
        src={info.getValue() || ""}
        alt={info.row.getValue("name")}
        width={100}
        height={70}
        className={styles.merchItemImage}
      />
    )
  }),
  columnHelper.accessor('name', {
    header: "Název",
    cell: info => info.getValue()
  }),
  // columnHelper.accessor('description', {
  //   header: "Popis",
  //   cell: info => info.getValue()
  // }),
  columnHelper.accessor('merch_categories.name', {
    header: "Kategorie",
    cell: info => info.getValue()
  }),
  columnHelper.accessor('archived', {
    header: "Viditelné",
    cell: info => (
      <div className={`${styles.dot} ${!info.getValue() ? styles.hidden : ""}`}></div>
    )
  }),
  columnHelper.accessor('id', {
    header: "Akce",
    cell: props => (
      <Button>
        <Link href={`portal/edit-merch/${props.getValue()}`}>Editovat</Link>
      </Button>
    )
  })
]

interface MerchPreviewCardProps {
  merch: MerchWithCategories[]
}

export function MerchTable ({ merch }: MerchPreviewCardProps) {

  const table = useReactTable({
      data: merch,
      columns,
      getCoreRowModel: getCoreRowModel()
    })

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}