import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { baseApi } from "../../utils/baseApi";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getStudentHandler();
  }, []);

  const getStudentHandler = async () => {
    setLoading(true);
    toast.loading("Loading Students..");
    try {
      const resp = await axios.get(`${baseApi}/user`);
      setStudents(resp.data.data);
      setLoading(false);
      console.log(resp.data.data);
      toast.dismiss();
    } catch (error) {
      setLoading(false);
      toast.dismiss();
      toast.error(error.response.data.message);
    }
  };

  return (
    <main className="p-6 bg-gray-100 min-h-[100vh]">
      <div className="">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded shadow">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Enrollment No
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Phone No.
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Fine
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Slot Available
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {!loading &&
              students &&
              students.map((item) => {
                return (
                  <tr className="text-center">
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {item.enrollmentno}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                      {item.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                      {item.phonenumber}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                      {item.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                      {item.fine}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                      {item.bookSlot}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <button
                        onClick={() =>
                          navigate("/dashboard/send-message", {
                            state: {
                              email: item.email,
                              eno: item.enrollmentno,
                              name: item.name,
                            },
                          })
                        }
                        className="inline-block rounded bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700"
                      >
                        <Send size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {students && students?.length === 0 && (
        <p className="text-center mt-10 text-gray-700">No Students Found!</p>
      )}
    </main>
  );
};

export default Student;
