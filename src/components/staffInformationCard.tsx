import moment from "moment";

interface Props {
    changes: {
        date: string;
        type: string;
        fields: string[];
        user_id: string;
        staff?: {
          _id: string;
          user_fullname: string;
          user_email: string;
        };
    }
}

function StaffInformation({ changes }: Props) {
    return (
        <div className="space-y-40 mb-6">
            <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h6 className="text-lg font-semibold text-green-700 mb-3">
                    Staff Information
                </h6>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <h6 className=" text-gray-500 font-bold ">Created By</h6>
                        <p className="text-black break-words overflow-wrap-anywhere">
                            {changes.staff?.user_fullname}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h6 className=" text-gray-500 font-bold ">Created At</h6>
                        <p className="text-black break-words overflow-wrap-anywhere">
                            {moment(changes.date).format("DD MMM YYYY, h:mm A")}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h6 className=" text-gray-500 font-bold ">Email</h6>
                        <p className="text-black break-words overflow-wrap-anywhere">
                            {changes.staff?.user_email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffInformation