import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Collapse, IconButton, TablePagination } from '@mui/material';

import { MateriaPrimaContext } from '@/context/materia-prima-context';
import { ListaMateriaPrimaResponse } from '@/services/api/materia-prima';
import { amountBrl } from '@/services/utils/amount';

export default function ListaMateriaPrimaTable() {
  const { materiaPrima } = React.useContext(MateriaPrimaContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
              <TableCell align="right">Estoque</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materiaPrima
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <ProdutoLinha row={row} key={row.id} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={materiaPrima.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

function ProdutoLinha({ row }: { row: ListaMateriaPrimaResponse }) {
  const [mostrarItens, setMostraItens] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell size="small">{row.nome}</TableCell>
        <TableCell size="small">{row.descricao}</TableCell>
        <TableCell size="small" align="right">
          <IconButton
            aria-label="spanning"
            size="small"
            onClick={() => setMostraItens(!mostrarItens)}
          >
            {mostrarItens ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={mostrarItens} timeout="auto" unmountOnExit>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    size="small"
                    align="right"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Quantidade
                  </TableCell>
                  <TableCell
                    size="small"
                    align="right"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Custo unitario
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.estoque_materia_prima.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell size="small" align="right">
                        {item.quantidade}
                      </TableCell>
                      <TableCell size="small" align="right">
                        {amountBrl(item.custo_unitario)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
