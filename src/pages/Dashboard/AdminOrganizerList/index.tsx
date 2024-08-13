import Form from 'react-bootstrap/Form';
import CommonTable from "../../../components/common/Tables"
import { ORGANIZER } from "../../../contracts/constants/roleConstant";
import { useGetUsersQuery, useVerifyOrganizerMutation } from "../../../redux/services/admin";
import "./style.scss";
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const tableRow = {
    fullName: "Full Name",
    email: "Email",
    createdAt: "Created At",
    isDeleted: "Deleted",
    isVerified: "Verified",
}

export const AdminOrganizerList = () => {
    const { data } = useGetUsersQuery({ role: ORGANIZER });
    const [verifyOrganizer] = useVerifyOrganizerMutation()


    const tableData = data?.data?.map((tableRow) => {
        return {
            ...tableRow,
            createdAt: format((tableRow.createdAt) as string, "LLL dd, yyyy"),
            // isVerified: <span>{tableRow.isVerified.toString()}</span>,
            isVerified: <Form.Check
                type='switch'
                className="bootstrap-switch"
                onChange={(e) => {
                    verifyOrganizer({ id: tableRow._id, isVerified: e.target.checked }).unwrap().then((res  ) => {
                        toast(res.message ?? "Organizer detailed successfully.", {
                            type: "success",
                            theme: "colored"
                        })
                    }).catch((err) => {
                        toast(err?.message ?? "Something went wrong.", {
                            type: "error",
                            theme: "colored"
                        })
                    })
                }}
                defaultChecked={tableRow.isVerified}
                disabled={!tableRow.isVerificationSubmitted}
            />,
            isDeleted: <span>{tableRow.isDeleted ? "Yes" : "No"}</span>
        }
    })

    return <div className="register-as-page admin-organizer">

        <CommonTable tableRow={tableRow} tableData={tableData ?? []} />


    </div>
}

export default AdminOrganizerList