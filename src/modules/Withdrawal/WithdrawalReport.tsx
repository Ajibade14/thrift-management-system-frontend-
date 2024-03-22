import PaginationBar from "@/components/Pagination";
import { StatusIndicator } from "@/components/StatusIndicator";
import DummyTransactions from "@/api/dummyTransactions.json";
import TransactionsTable from "@/components/Tables";
import AmountFormatter from "@/utils/AmountFormatter";
import { CustomButton, FilterDropdown } from "@/components/Buttons";
import { SearchInput } from "@/components/Forms";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "@/api/hooks/useAuth";
import { WithdrawalProps } from "@/types";
import StatusBadge, { Badge } from "@/components/StatusBadge";
import { useSelector } from "react-redux";
import { selectUser } from "@/slices/OrganizationIdSlice";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export default function WithdrawalReport(){
    const userId = useSelector(selectUser)
    const router = useRouter();
    const { client } = useAuth();

    // const {mutate: uploadReceipt} = useMutation({
    //   mutationKey: ['upload receipy'],
    //   mutationFn: async(e) => {

    //     const file = e.target.files[0];
    //   if (!file) return; // If no file is selected, do nothing
    //   try {
    //     const formData = new FormData();
    //     formData.append('file', file);
  
    //     // Send the file to the backend
    //     return client.post(`/api/withdrawal/${withdrawalId}`)
        

    //   }
    // })

    // const handleFileUpload = async (e) => {
    //   const file = e.target.files[0];
    //   if (!file) return; // If no file is selected, do nothing
    //   try {
    //     const formData = new FormData();
    //     formData.append('file', file);
  
    //     // Send the file to the backend
    //     const response = await axios.post('/api/upload', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });
    //     console.log('File uploaded:', response.data);
    //   } catch (error) {
    //     console.error('Error uploading file:', error);
    //   }
    // };


    const { mutate: UpdateWithdrawalConfirmation } = useMutation({
      mutationFn: async (withdrawalId) => {

        
        return client.put(`/api/withdrawal/${withdrawalId}`, {
          withdrawalRequest: "confirmed",
          status: "paid"
        });
      },
      onSuccess(response: AxiosResponse<any>) {
        console.log(response)
        router.push('/merchant/settings/withdrawals')
        router.refresh()
      },
      onError(error: AxiosError<any, any>) {
      
  
        console.log(error?.response?.data);
      },
    });

    const {
        data: withdrawals,
        isLoading: isWithdrawalLoading,
        isError: withDrawerError,
      } = useQuery({
        queryKey: ["allWithdrawals"],
        queryFn: async () => {
          return client
            .get(`/api/withdrawal?user=${userId}`, {})
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              console.log(error);
              throw error;
            });
        },
      });
     console.log(withdrawals)

     
    return(
        <div className="mt-16">
             <section>
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <span className="md:flex items-center gap-3">
            <p className="text-white">Withdrawal Report</p>
            <SearchInput />
            
             
          </span>
          <span className="flex items-center gap-3">
            
            <FilterDropdown
              options={[
                "Customer Account",
                "Saving Purpose",
                "Transaction Date & Time",
                "Amount",
                "Narration",
                "Reference ID",
                "Status",
                "Confirmation Status"
              ]}
            />
          </span>
          
        </div>

        <div>
            {withdrawals && 
        <TransactionsTable
            headers={[
            "Customer Account",
            "Saving Purpose",
            "Transaction Date & Time",
            "Amount",
            "Narration",
            "Reference ID",
            "Status",
            "Confirmation Status",
              "Upload Evidence of Receipt"
          ]}
            content={withdrawals?.map((withdrawal:WithdrawalProps, index:string) => (
              <tr className="" key={index}>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {withdrawal.user.accountNumber}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {withdrawal.saving}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                {withdrawal.updatedAt ? 
                    new Date(withdrawal.updatedAt).toLocaleDateString() : 
                    'Invalid Date'} {withdrawal.updatedAt ? 
                        new Date(withdrawal.updatedAt).toLocaleTimeString() : 
                        'Invalid Date'}

                </td>


                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {AmountFormatter(Number(withdrawal.amount))} NGN
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {withdrawal._id}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <StatusBadge status={withdrawal.status}/>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                {/* <StatusBadge status={withdrawal.paymentConfirmation} /> */}
                <Badge status={withdrawal.paymentConfirmation} onClick={() => console.log(12)}/>
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm">
                
                <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center cursor-pointer">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  Upload
                  <input
                    type="file"
                    className="hidden"
                    // onChange={()}
                    accept="image/*,.pdf,.doc,.docx,.txt" // Accept images and common document formats
                  />
                </label>

                </td>

              </tr>
            ))}
          />}
          <PaginationBar apiResponse={DummyTransactions} />
        </div>
      </section>
        </div>
    )
}