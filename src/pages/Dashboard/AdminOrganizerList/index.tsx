import CommonTable from "../../../components/common/Tables"
import { ORGANIZER } from "../../../contracts/constants/roleConstant";
import { useGetUsersQuery } from "../../../redux/services/admin";
import "./style.scss";

const tableRow = {
    fullName: "Full Name",
    email: "Email",
    createdAt: "Created At",
    isVerified: "Verified",
    isDeleted: "Deleted"
}

const tableData = [
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


export const AdminOrganizerList = () => {
    const { data } = useGetUsersQuery({ role: ORGANIZER })

    console.log(data, "........ data")

    return <div className="register-as-page admin-organizer">

        <CommonTable tableRow={tableRow} tableData={data?.data ?? []} />


    </div>
}

export default AdminOrganizerList