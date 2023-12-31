import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Collapse, IconButton, TablePagination } from '@mui/material';

import {
  ListaProdutos,
  ListaProdutosContext,
} from '@/context/lista-produto-context';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ListaProdutosTable() {
  const { produtos } = React.useContext(ListaProdutosContext);
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
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Valor
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Custo
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">
                Materiais
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos
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
        count={produtos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

function ProdutoLinha({ row }: { row: ListaProdutos }) {
  const [mostrarItens, setMostraItens] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell size="small">{row.nome}</TableCell>
        <TableCell size="small">{row.descricao}</TableCell>
        <TableCell size="small" align="right">
          {row.valor}
        </TableCell>
        <TableCell size="small" align="right">
          {row.preco_custo}
        </TableCell>
        <TableCell size="small" align="center">
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={mostrarItens} timeout="auto" unmountOnExit>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    size="small"
                    align="left"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Material
                  </TableCell>
                  <TableCell
                    size="small"
                    align="right"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Quantidade
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.materia_prima.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell size="small" align="left">
                      {item.nome}
                    </TableCell>
                    <TableCell size="small" align="right">
                      {item.quantidade}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
