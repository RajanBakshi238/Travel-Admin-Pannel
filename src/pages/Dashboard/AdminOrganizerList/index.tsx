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
                    verifyOrganizer({ id: tableRow._id, isVerified: e.target.checked }).unwrap().then((res) => {
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
            isDeleted: <span>{tableRow.isDeleted ? "Yes" : "No"}</span>,
            openedContent: <div className='opened-content'>
                <div>
                    <h5>Address:</h5> <p>{tableRow?.organizer?.address}</p>
                </div>
                <div>
                    <h5>Contact Number:</h5> <p>{tableRow?.organizer?.contactNumber}</p>
                </div>
                <div>
                    <h5>Description:</h5> <p>{tableRow?.organizer?.description}</p>
                </div>
                <div>
                    <h5>Website:</h5> <p>{tableRow?.organizer?.website || "NA"}</p>
                </div>
                <div>
                    <h5>Addhar Number:</h5> <p>{tableRow?.organizer?.aadhaarNumber}</p>
                </div>
                <div>
                    <h5>Addhar Card</h5>
                    <img src={`${import.meta.env.VITE_BACKEND_URL}${tableRow?.organizer?.adhaarImage?.path}`} alt="adhar image" />
                </div>
                <div>
                    <h5>Pan Number:</h5> <p>{tableRow?.organizer?.panNumber}</p>
                </div>
                <div>
                    <h5>Pan Card:</h5> 
                    <img src={`${import.meta.env.VITE_BACKEND_URL}${tableRow?.organizer?.panImage?.path}`} alt="adhar image" />
                </div>
                <div>
                    <h5>Gst Number:</h5> <p>{tableRow?.organizer?.gstNumber || "NA"}</p>
                </div>
            </div>
        }
    })

    return <div className="register-as-page admin-organizer">

        <CommonTable tableRow={tableRow} tableData={tableData ?? []} openDetail={true} />


    </div>
}

export default AdminOrganizerList