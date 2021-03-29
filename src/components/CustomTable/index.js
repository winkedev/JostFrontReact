import React, { useRef } from 'react';
import './style.css';
import { downloadAsExcel, downloadAsExcelWithHeadings } from '../../utils/XLS/jsonexcel';
/* import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'; */

import { ReactComponent as ExcellSVG } from '../../assets/excell.svg';
import { ReactComponent as PDFSVG } from '../../assets/pdf.svg';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditfactory from 'react-bootstrap-table2-editor';

import paginationFactory from 'react-bootstrap-table2-paginator';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jspdf from 'jspdf';
import 'jspdf-autotable';

import { SecurityConfig } from '../../services/SecurityConfig';


import JOSTLOGO from '../../assets/jost-logo1.png';
import { faCreativeCommonsZero } from '@fortawesome/free-brands-svg-icons';

const CustomTable = ({ tableid, fieldKey, customcolumns, customdata, isAlternateRowColor, validateNewValue, onValidateErrorEvent, pdfHeaderText, orientation, disableExport, customdiv }) => {

    const tableRef = useRef(null);

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

    const saveAsXLS = () => {
        let mycols = [];
        let myrefCols = {};
        let mydata = [];

        Object.keys(tableRef.current.props.columns).map((k, v) => {
            if (tableRef.current.props.columns[v].hidden == null || tableRef.current.props.columns[v].hidden == false) {
                mycols.push(tableRef.current.props.columns[v].text);
                myrefCols[tableRef.current.props.columns[v].text] = tableRef.current.props.columns[v].dataField;
            }
        })

        Object.keys(tableRef.current.props.data).map((k, v) => {
            let dicInside = [];
            Object.keys(mycols).map((k2, v2) => {
                dicInside.push(tableRef.current.props.data[v][myrefCols[mycols[v2]]]);
            })
            mydata.push(dicInside);
        })

        downloadAsExcelWithHeadings(["Teste01", "Teste02"], mycols, mydata, "relatorioXXX");
    }

    const saveAsPDF = () => {

        var doc = new jspdf(orientation != null ? orientation : 'l', 'pt');

        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
        var xtable = document.getElementById("xtable");

        doc.page = 1;
        var totalPagesExp = "{total_pages_count_string}";

        var tableHeader = () => {

            var xtable = document.getElementById("xtable");

            if (xtable == null) {
                return;
            }

            var xtable = doc.autoTableHtmlToJson(xtable);
            //var headers = ["Header 1", "Header 2"];
            //var rows = [["Cell 1", "Cell 2"], ["Cell 1", "Cell 2"]];

            //doc.addImage(JOSTLOGO, 'png', orientation == 'p' ? (pageWidth / 2) : (pageHeight / 2), 0, 135, 56);

            doc.autoTable(xtable.columns, xtable.data,
                {
                    margin: {
                        top: 50, bottom: 0
                    },
                    headerStyles: {
                        fillColor: [82, 86, 89],
                        fontSize: 16,
                        fontWeight: 300
                    },
                    bodyStyles: {
                        lineColor: [0, 0, 0],
                    },
                    didDrawCell: function (data) {

                    }
                });

        }

        var tableFooter = () => {
            doc.setFontSize(10);
            doc.text(pageWidth - 100, pageHeight - 10, `Pagina: ${doc.page}/${totalPagesExp}`);
            doc.page++;
        }

        var opt = {
            beforePageContent: tableHeader,
            afterPageContent: tableFooter,
            margin: { top: xtable == null ? 80 : 130, bottom: 30 }
        }

        var elem = document.getElementById(tableid ?? "table-to-xls");

        let mycols = [];
        let myrefCols = {};
        let mydata = [];

        Object.keys(tableRef.current.props.columns).map((k, v) => {
            if (tableRef.current.props.columns[v].hidden == null || tableRef.current.props.columns[v].hidden == false) {
                mycols.push(tableRef.current.props.columns[v].text);
                myrefCols[tableRef.current.props.columns[v].text] = tableRef.current.props.columns[v].dataField;
            }
        })

        Object.keys(tableRef.current.props.data).map((k, v) => {
            let dicInside = [];
            Object.keys(mycols).map((k2, v2) => {
                dicInside.push(tableRef.current.props.data[v][myrefCols[mycols[v2]]]);
            })
            mydata.push(dicInside);
        })

        //var res = doc.autoTableHtmlToJson(elem);
        //doc.autoTable(res.columns, res.data, opt);
        doc.autoTable(mycols, mydata, opt);
        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp);
        }
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

    function rowClassNameFormat(row, rowIdx) {
        // row is whole row object
        // rowIdx is index of row
        return rowIdx % 2 === 0 ? 'td-alternate-color-x' : 'td-alternate-color-y';
    }

    return (
        <div>
            { customdata != null && customcolumns != null
                ?

                <div style={{ backgroundColor: "#FFF", marginTop: "10px" }}>
                    <BootstrapTable
                        ref={tableRef}
                        bootstrap4
                        caption={pdfHeaderText}
                        id={tableid ?? "table-to-xls"}
                        keyField={fieldKey != null ? fieldKey : "id"}
                        columns={customcolumns}
                        data={customdata}
                        pagination={paginationFactory()}
                        noDataIndication="Table Empty"
                        rowClasses={rowClassNameFormat}
                        cellEdit={cellEditfactory({
                            mode: "click",
                            beforeSaveCell(oldValue, newValue, row, column, done) {
                                setTimeout(() => {
                                    SecurityConfig.writeLogs("*CustomTable*", `old value: ${oldValue} new value: ${newValue}`);
                                    if (validateNewValue(row, newValue)) {
                                        done();
                                    }
                                    else {
                                        onValidateErrorEvent();
                                    }

                                }, 0);
                                return { async: true };
                            }
                        })} />

                    {disableExport ? "" : <div>
                        <button onClick={() => saveAsXLS()} className="btn btn-scale"><i><ExcellSVG width={31} height={31} fill="#000" opacity="0.5" /> </i></button>
                        <button onClick={() => saveAsPDF()} className="btn btn-scale"><i><PDFSVG width={31} height={31} fill="#000" opacity="0.5" /> </i></button>
                    </div>}

                    {customdiv}

                </div>
                : ""}
        </div >
    )
}

export default CustomTable;