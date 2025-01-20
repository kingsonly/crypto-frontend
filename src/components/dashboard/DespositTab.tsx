import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bitcoin, Ethereum } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import axios from "axios";

function Notification({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  return (
    <div
      className={`p-3 rounded-lg mb-4 text-sm ${type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
        }`}
    >
      {message}
    </div>
  );
}

type CryptoType = "Bitcoin" | "Ethereum" | "USDT";

type Deposit = {
  id: number;
  amount: number;
  currency: CryptoType;
  status: string;
};

export default function DepositTab() {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [indexLoading, setIndexLoading] = useState<number | null>(null);
  const [token, setToken] = useState(false);
  const [newDeposit, setNewDeposit] = useState();
  const [allDeposit, setAllDeposit] = useState([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loadDeposit, setLoadDeposit] = useState(false);

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [depositError, setDepositError] = useState<string | null>(null);
  const baseUrl = import.meta.env.VITE_API_URL;
  const [isDepositComplete, setIsDepositComplete] = useState(false);
  const [depositSuccessMessage, setDepositSuccessMessage] = useState<
    string | null
  >(null);
  const [deposits, setDeposits] = useState([]);
  const [selectedCryptoWallet, setSelectedCryptoWallet] = useState<any>({});
  useEffect(() => {
    let getToken: any = JSON.parse(localStorage.getItem("user"));
    fetchWalletAddress();
    if (getToken && getToken.token) {
      // console.log('message',getToken)
      setToken(getToken.token);
      setIsAdmin(getToken.is_admin || false); // Assuming `is_admin` is a boolean property
    }
    getDeposits();
  }, []);

  const handleViewDeposit = (deposit: any) => {
    setSelectedCrypto(deposit.method);
    setAllDeposit(deposit); // Set the deposit being viewed
    setIsModalOpen(true); // Open the modal
    setIsDepositComplete(true); // Show the barcode and "Confirm Payment" button
  };
  const getDeposits = async () => {
    let getToken: any = JSON.parse(localStorage.getItem("user"));
    setLoadDeposit(true);
    await axios
      .post(
        `${baseUrl}/transaction`,
        { type: "deposit" },
        {
          headers: {
            Authorization: `Bearer ${getToken.token}`, // Include Bearer token in headers
            "Content-Type": "application/json", // Optional, specify content type
          },
        }
      )
      .then((response) => {
        // console.log(response.data)
        // console.log(response.data)
        setLoadDeposit(false);
        if (response.data.status === "success") {
          setDeposits(response.data.data);
        }
        console.log("allDeposit:", response.data);
        console.log("allDeposit:", response.data);
      })
      .catch((error) => {
        setLoadDeposit(false);
      });
  };
  const openModal = (crypto: CryptoType) => {
    setSelectedCrypto(crypto);
    setIsModalOpen(true);
    resetForm();
  };

  const closeModal = () => {
    setSelectedCrypto(null);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNotification(null);
    setDepositError(null);
    setDepositAmount("");
    setIsDepositComplete(false);
    setDepositSuccessMessage(null);
  };

  const handleSubmit = async () => {
    const amount = parseFloat(depositAmount);

    if (isNaN(amount) || amount <= 0) {
      setDepositError("Please enter a valid deposit amount.");
      return;
    }

    setLoading(true);
    let data: any = {
      method: selectedCrypto,
      amount: depositAmount,
    };
    await axios
      .post(`${baseUrl}/transaction/deposit`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token in headers
          "Content-Type": "application/json", // Optional, specify content type
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          setNewDeposit(response.data.data.id);

          // Show notification after 1 second

          setNotification({
            message: "Deposit successfully.",
            type: "success",
          });

          // Hide notification after another 3 seconds
          setTimeout(() => {
            setNotification(null); // Clear the notification
          }, 1000); // 3000ms = 3 seconds

          setLoading(false);
          setIsDepositComplete(true);
        } else {
          setDepositError("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        if (!error.response) {
          // Handle network error or no response
          setDepositError(
            "Network error: Please check your internet connection."
          );
        } else {
          const errorResponse = error.response.data;

          // Display API error messages if available
          if (errorResponse.message) {
            if (Array.isArray(errorResponse.message)) {
              setDepositError(errorResponse.message); // For an array of messages
            } else {
              setDepositError(errorResponse.message); // Single error message
            }
          } else {
            setDepositError("An unexpected error occurred. Please try again.");
          }
        }
        //  setDepositError("Network error: Please check your internet connection.");
      })
      .finally(() => {
        setLoading(false); // Ensure loading state is turned off
      });
  };

  const handleConfirmPayment = async (depositId: number) => {
    setLoading(true);

    await axios
      .get(`${baseUrl}/transaction/notify/${newDeposit}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token in headers
          "Content-Type": "application/json", // Optional, specify content type
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          setNotification({
            message:
              "Thank you for confirming your payment. You will receive an email once the admin confirms your payment, and your wallet will be updated instantly.",
            type: "success",
          });

          getDeposits();
          setTimeout(closeModal, 2000);
          // setNotification(true)
          // setLoading(false)

          // console.log('NewDeposit',response.data.data)
          // setIsDepositComplete(true)
        } else {
          setNotification({
            message: "Payment confirmation failed. Please try again.",
            type: "error",
          });
        }
      })
      .catch((error) => {
        setNotification({
          message: "An error occurred while confirming your payment.",
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false); // Ensure loading state is turned off
      });
  };

  const approveDeposit = async (depositId: number) => {
    setIndexLoading(depositId);

    await axios
      .get(`${baseUrl}/transaction/confirm-deposit/${depositId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token in headers
          "Content-Type": "application/json", // Optional, specify content type
        },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setNotification({
            message: "Successfully approved this deposit",
            type: "success",
          });

          setIndexLoading(null);
          getDeposits();
        } else {
          setNotification({
            message: "Deposit approval failed. Please try again.",
            type: "error",
          });
        }
      })
      .catch((error) => {
        setNotification({
          message: "An error occurred while trying to approve your deposit.",
          type: "error",
        });
      })
      .finally(() => {
        setIndexLoading(null); // Ensure loading state is turned off
      });
  };

  const fetchWalletAddress = async () => {

    try {
      const response = await axios.get(`${baseUrl}/wallet-address`);

      if (response.data.status === "success") {
        let filteredAddressStructure: any = {}
        response.data.data.map((address: any) => {
          filteredAddressStructure[address.name] = address.address
        });

        setSelectedCryptoWallet(filteredAddressStructure);
      } else {
        console.error("Error fetching investments: ", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching investments:", error);

    } finally {


    }
  };

  return (
    <div className="space-y-8 text-white">
      {!isAdmin && (
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 mb-4">
            Deposit Funds
          </h2>
          {/* Deposit Cards */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                Choose Deposit Method
              </CardTitle>
              <CardDescription className="text-gray-300">
                Select a cryptocurrency to deposit funds into your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Bitcoin", "Ethereum", "USDT"].map((crypto) => (
                  <Button
                    onClick={() => openModal(crypto as CryptoType)}
                    key={crypto}
                    variant="outline"
                    className="h-16 flex flex-col items-center justify-center text-black hover:text-black text-sm"
                  >
                    <Bitcoin className="h-6 w-6 mb-2" />
                    {crypto}{crypto !== "Bitcoin" ? "(ERC-20)" : null}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deposit Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full">
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-64 sm:w-1/2 md:w-3/4 lg:w-1/2 xl:w-112 relative">
                <div
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-white text-xl cursor-pointer"
                >
                  &times;
                </div>

                <h3 className="text-lg font-semibold text-white mb-4">
                  Deposit {selectedCrypto}
                </h3>

                {depositSuccessMessage && (
                  <p className="text-green-500 mb-4">{depositSuccessMessage}</p>
                )}

                {notification && (
                  <Notification
                    message={notification.message}
                    type={notification.type}
                  />
                )}

                {!isDepositComplete ? (
                  <>
                    <p className="text-sm text-gray-400 mb-4">
                      Enter the amount you wish to deposit
                    </p>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full p-1 mb-2 text-white rounded-lg text-lg"
                    />
                    {depositError && (
                      <p className="text-red-500 text-sm">{depositError}</p>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <h2> Wallet Address</h2>
                    <p className=" text-white mt-2">
                      <h2 className="break-all">
                        {selectedCryptoWallet[selectedCrypto]}

                      </h2>

                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-4 mt-4">
                  <Button
                    onClick={closeModal}
                    className="bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    Close
                  </Button>
                  {isDepositComplete ? (
                    <Button
                      onClick={handleConfirmPayment}
                      className="bg-green-600 hover:bg-green-500 text-white"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Notify Admin"}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      className="bg-blue-600 hover:bg-blue-500 text-white"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Deposit"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Deposit History Table */}
      {/* <h2 className="text-2xl font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
        Deposit History
      </h2> */}
      {!isAdmin && (
        <div className="overflow-x-auto bg-gray-800 border-gray-700 rounded-lg shadow-lg">
          {loadDeposit ? "Loading..." : (
            <table className="min-w-full table-auto text-sm text-gray-200">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-8 py-2 text-left">SN</th>
                  <th className="px-8 py-2 text-left">Amount</th>
                  <th className="px-8 py-2 text-left">Method</th>
                  <th className="px-8 py-2 text-left">Status</th>
                  <th className="px-8 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((deposit, index) => (
                  <tr key={deposit.id} className="border-t border-gray-700">
                    <td className="px-8 py-2">{index + 1}</td>
                    <td className="px-8 py-2">{deposit.amount}</td>
                    <td className="px-8 py-2">{deposit.method}</td>

                    <td
                      className={`px-8 py-2 ${deposit.status === 1 ? "text-green-500" : "text-red-500"
                        }`}
                    >
                      {deposit.status === 1 ? "Confirmed" : "pending"}
                    </td>
                    <td className="px-8 py-2">
                      {deposit.status === 0 && (
                        <Button
                          onClick={() => handleViewDeposit(deposit)}
                          // onClick={() => handleConfirmPayment()}
                          // onClick={() => handleConfirmPayment(deposit)}
                          // onClick={handleConfirmPayment}
                          className="bg-blue-600 hover:bg-blue-500 text-white"
                        >
                          View
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {isAdmin && (
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 mb-5">
            Display all deposits
          </h2>

          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}

          <div className={`overflow-x-auto bg-gray-800 border-gray-700 rounded-lg shadow-lg ${loadDeposit ? 'p-4' : 'p-2'}`}>
            {loadDeposit ? "Loading..." : (
              <table className="min-w-full table-auto text-sm text-gray-200">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">SN</th>
                    <th className="px-4 py-2 text-left">User</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Method</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deposits.map((deposit, index) => (
                    <tr key={deposit.id} className="border-t border-gray-700">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{deposit.user && deposit.user.name}</td>
                      <td className="px-4 py-2">{deposit.amount}</td>
                      <td className="px-4 py-2">{deposit.method}</td>

                      <td
                        className={`px-4 py-2 ${deposit.status === 1
                          ? "text-green-500"
                          : "text-red-500"
                          }`}
                      >
                        {deposit.status === 1 ? 'Confirmed' : 'pending'}
                      </td>
                      <td className={`px-4 py-2 ${deposit.status === 1
                        ? "text-green-500"
                        : "text-red-500"
                        }`}>
                        {deposit.status === 0 && (
                          <Button
                            onClick={() => approveDeposit(deposit.id)}
                            // onClick={() => handleConfirmPayment()}
                            // onClick={() => handleConfirmPayment(deposit)}
                            // onClick={handleConfirmPayment}
                            className="bg-blue-600 hover:bg-blue-500 text-white"
                          >
                            {indexLoading == deposit.id ? "Processing..." : "Approve"}
                          </Button>
                        )}
                        {deposit.status === 1 && (
                          <span>Approved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
