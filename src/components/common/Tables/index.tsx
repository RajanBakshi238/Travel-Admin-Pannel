import "./style.scss"

const tableRow = {
    id: "ID",
    name: "Name",
    description: "Description",
    createdAt: "Created At",
    owner: "Owner",
    age: "Age",
    place: "Place",
    company: "Company",
    stamp: "Stamp"
}

// const tableRow2 = {
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

const tableTestData = [
    {
        id: "1",
        name: "Test",
        description: "Test description lorem ipsum is a here we have a do will is go and secbea",
        createdAt: "23-08-200",
        owner: "Harish",
        age: "12",
        place: "New Delhi",
        company: "chikky",
        stamp: "gret"
    },
    {
        id: "1",
        name: "Test",
        description: "Test description lorem ipsum is a here we have a do will is go and secbea",
        createdAt: "23-08-200",
        owner: "Harish",
        age: "12",
        place: "New Delhi",
        company: "chikky",
        stamp: "gret"
    },
    {
        id: "1",
        name: "Test",
        description: "Test description lorem ipsum is a here we have a do will is go and secbea",
        createdAt: "23-08-200",
        owner: "Harish",
        age: "12",
        place: "New Delhi",
        company: "chikky",
        stamp: "gret"
    },
    {
        id: "1",
        name: "Test",
        description: "Test description lorem ipsum is a here we have a do will is go and secbea",
        createdAt: "23-08-200",
        owner: "Harish",
        age: "12",
        place: "New Delhi",
        company: "chikky",
        stamp: "gret"
    },
    {
        id: "1",
        name: "Test",
        description: "Test description lorem ipsum is a here we have a do will is go and secbea",
        createdAt: "23-08-200",
        owner: "Harish",
        age: "12",
        place: "New Delhi",
        company: "chikky",
        stamp: "gret"
    },
    {
        id: "1",
        name: "Test",
        description: "Test description lorem ipsum is a here we have a do will is go and secbea",
        createdAt: "23-08-200",
        owner: "Harish",
        age: "12",
        place: "New Delhi",
        company: "chikky",
        stamp: "gret"
    }
]

const CommonTable = () => {

    return <div className="common-table">
        <table>

            <thead>
                <tr>
                    {Object.entries(tableRow).map(([_key, value]: [string, string], index: number) => {
                        return <th key={index}>{value}</th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {
                    tableTestData.map((rowData: ITableRow, index) => {
                        return <tr>
                            {Object.entries(tableRow).map(([key, _value]: [string, string], index: number) => {
                                return <td key={index}>{rowData?.[key]}</td>;
                            })}

                        </tr>
                    })
                }
            </tbody>

        </table>
    </div>
}

export default CommonTable
