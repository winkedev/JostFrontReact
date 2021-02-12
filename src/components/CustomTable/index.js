import React, { useState, useEffect } from 'react';
import './style.css';

import { ReactComponent as ExcellSVG } from '../../assets/excell.svg';
import { ReactComponent as PDFSVG } from '../../assets/pdf.svg';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jspdf from 'jspdf';
import 'jspdf-autotable';

const CustomTable = ({ customcolumns, customdata }) => {

    //#region Exemplos de Columns / Data e ActionFormatter
    /* const actionformatter = (cell, row) => {
        return <div>
            <button style={{ margin: "0 5px" }} className="btn btn-secondary">Add</button>
            <button style={{ margin: "0 5px" }} className="btn btn-secondary">Remove</button>
            <button style={{ margin: "0 5px" }} className="btn btn-secondary">Edit</button>
        </div>
    } 

    const columns = [
        {
            dataField: "C1",
            text: "Column1",
            sort: true,
            headerStyle: { backgroundColor: "gray" }
        },
        {
            dataField: "C2",
            text: "Column2",
            sort: true
        },
        {
            dataField: "C3",
            text: "Column3",
            formatter: actionformatter,
            sort: true
        }
    ]

    const fillData = () => {
        var data = [];
        for (var i = 0; i < 50; i++) {
            data.push({
                key: i,
                ID: i,
                C1: Math.random() * 100,
                C2: Math.random() * 100
            })
        }

        console.log(data);
        return data;
    }

    */

    //#endregion

    const saveAsPDF = () => {
        var doc = new jspdf('p', 'pt');
        var elem = document.getElementById("table-to-xls");
        var res = doc.autoTableHtmlToJson(elem);
        doc.autoTable(res.columns, res.data);
        doc.save("table.pdf");

        /*
        doc.autoTable({
            head: [['Name', 'Email', 'Country']],
            body: [
              ['David', 'david@example.com', 'Sweden'],
              ['Castille', 'castille@example.com', 'Spain'],
              // ...
            ],
          })
          */
    }

    return (
        <div>
            { customdata != null && customcolumns != null
                ?

                <div style={{ backgroundColor: "#FFF", margin: "10px 0" }}>
                    <BootstrapTable id="table-to-xls" keyField="id" columns={customcolumns} data={customdata} pagination={paginationFactory()} noDataIndication="Table Empty" />

                    <ReactHTMLTableToExcel id="test-table-xls-button"
                        className="download-table-xls-button btn"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText={<i><ExcellSVG className="btn-scale" width={31} height={31} fill="#000" opacity="0.5" /></i>}

                    >

                    </ReactHTMLTableToExcel>
                    <button onClick={() => saveAsPDF()} className="btn btn-scale"><i><PDFSVG width={31} height={31} fill="#000" opacity="0.5" /> </i></button>
                </div>
                : ""}
        </div >
    )
}

export default CustomTable;