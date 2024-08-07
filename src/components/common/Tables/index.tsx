import "./style.scss"

// const tableRow = {
//     id: "ID",
//     name: "Name",
//     description: "Description",
//     createdAt: "Created At",
//     owner: "Owner",
//     age: "Age",
//     place: "Place",
//     company: "Company",
//     stamp: "Stamp"
// }


// type ITableRow = typeof tableRow
type ITableRow = {
    [key: string]: string;
}

// const tableData = [
//     {
//         id: "1",
//         name: "Test",
//         description: "Test description lorem ipsum is a here we have a do will is go and secbea",
//         createdAt: "23-08-200",
//         owner: "Harish",
//         age: "12",
//         place: "New Delhi",
//         company: "chikky",
//         stamp: "gret"
//     },
//     {
//         id: "1",
//         name: "Test",
//         description: "Test description lorem ipsum is a here we have a do will is go and secbea",
//         createdAt: "23-08-200",
//         owner: "Harish",
//         age: "12",
//         place: "New Delhi",
//         company: "chikky",
//         stamp: "gret"
//     },
//     {
//         id: "1",
//         name: "Test",
//         description: "Test description lorem ipsum is a here we have a do will is go and secbea",
//         createdAt: "23-08-200",
//         owner: "Harish",
//         age: "12",
//         place: "New Delhi",
//         company: "chikky",
//         stamp: "gret"
//     },
//     {
//         id: "1",
//         name: "Test",
//         description: "Test description lorem ipsum is a here we have a do will is go and secbea",
//         createdAt: "23-08-200",
//         owner: "Harish",
//         age: "12",
//         place: "New Delhi",
//         company: "chikky",
//         stamp: "gret"
//     },
//     {
//         id: "1",
//         name: "Test",
//         description: "Test description lorem ipsum is a here we have a do will is go and secbea",
//         createdAt: "23-08-200",
//         owner: "Harish",
//         age: "12",
//         place: "New Delhi",
//         company: "chikky",
//         stamp: "gret"
//     },
//     {
//         id: "1",
//         name: "Test",
//         description: "Test description lorem ipsum is a here we have a do will is go and secbea",
//         createdAt: "23-08-200",
//         owner: "Harish",
//         age: "12",
//         place: "New Delhi",
//         company: "chikky",
//         stamp: "gret"
//     }
// ]

interface ICommontable {
    tableRow: ITableRow;
    tableData: any[];
}

const CommonTable: React.FC<ICommontable> = ({ tableRow, tableData }) => {

    return <div className="common-table">
        <table style={{
            ...(tableData.length === 0 ? { minHeight: "500px" } : {})
        }}>

            <thead>
                <tr>
                    {Object.entries(tableRow).map(([_key, value]: [string, string], index: number) => {
                        return <th key={index}>{value}</th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {
                    tableData.map((rowData: ITableRow, _index) => {
                        return <tr>
                            {Object.entries(tableRow).map(([key, _value]: [string, string], index: number) => {
                                return <td key={index}>{rowData?.[key]}</td>;
                            })}

                        </tr>
                    })
                }
                {tableData.length === 0 && <tr className="no-data-row"><h4>No data found !</h4></tr>}

            </tbody>

        </table>
    </div>
}

export default CommonTable
