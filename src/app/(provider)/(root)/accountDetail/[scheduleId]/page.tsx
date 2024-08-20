"use client";

import { api } from "@/apis/api";
import MainLayout from "@/components/Layout/MainLayout";
import Icon from "@/components/commons/Icon";
import { ICON } from "@/constants/icon";
import { Account, AccountType, PayType } from "@/types/Account";
import { Schedule } from "@/types/plan";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";
import Badge from "../../account/_components/Badge";

const types = ["현금", "이체", "체크", "신용"];

type AccountDetailProps = { params: { scheduleId: string } };
export default function AccountDetailPage({
  params: { scheduleId },
}: AccountDetailProps) {
  const queryClient = useQueryClient();
  const router = useRouter(); // Use the useRouter hook

  const { data: account, isLoading } = useQuery({
    queryKey: ["account", scheduleId],
    queryFn: () => api.account.getAccount(scheduleId),
  });

  const [scheduleData, setScheduleData] = useState<Schedule>();

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const data = await api.account.getSchedule(scheduleId);
        setScheduleData(data.data);
      } catch (e) {
        console.error("Error fetching schedule:", e);
      }
    }

    fetchSchedule();
  }, [scheduleId]);

  const createAccountMutation = useMutation<Account, Error, Account>({
    mutationFn: (newAccount: Account) => api.account.createAccount(newAccount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      router.push("/account/" + scheduleData?.planId);
    },
  });

  const updateAccountMutation = useMutation<Account, Error, Account>({
    mutationFn: async (updatedAccount: Account) => {
      if (updatedAccount && updatedAccount.id) {
        const response = await api.account.updateAccount(
          updatedAccount.id.toString(),
          updatedAccount
        );

        if (!response) {
          throw new Error("업데이트 에러");
        }

        return response;
      } else {
        throw new Error("업데이트 에러");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      router.push("/account/" + scheduleData?.planId);
    },
  });

  const deleteAccountMutation = useMutation<void, Error, number | string>({
    mutationFn: async (id: number | string) => {
      await api.account.deleteAccount(id.toString());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      router.push("/account/" + scheduleData?.planId);
    },
  });

  const [selectedType, setSelectedType] = useState<PayType>("현금");
  const [selectedCategory, setSelectedCategory] = useState<AccountType>("지출");
  const [amount, setAmount] = useState<number>(0);
  const [area, setArea] = useState<string>("기본 장소");
  const [desc, setDesc] = useState<string>("기본 설명");

  useEffect(() => {
    if (account) {
      const validPayType: PayType = types.includes(account.payType)
        ? (account.payType as PayType)
        : "현금";
      setSelectedType(validPayType);

      const validCategory: AccountType =
        account.type === "지출" || account.type === "수입"
          ? account.type
          : "지출";
      setSelectedCategory(validCategory);
      setAmount(account.amount);
      setArea(account.area ?? scheduleData?.place ?? "기본 장소");
      setDesc(account.desc || "기본 설명");
    }
    setArea(scheduleData?.place || "기본 장소");
  }, [account, scheduleData]);

  const handleBadgeClick = (type: string) => {
    setSelectedType(type as PayType);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category as AccountType);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const handleCreateDefaultAccount = () => {
    if (!account) {
      const newAccount: Account = {
        type: selectedCategory,
        payType: selectedType,
        amount,
        desc,
        area: scheduleData?.place,
        planId: scheduleData?.planId,
        scheduleId,
      };
      createAccountMutation.mutate(newAccount);
    }
  };

  const handleEditAccount = () => {
    if (account) {
      const updatedAccount: Account = {
        ...account,
        type: selectedCategory,
        payType: selectedType,
        amount,
        desc,
      };
      updateAccountMutation.mutate(updatedAccount);
    }
  };

  const handleDeleteAccount = () => {
    if (account && account.id) {
      deleteAccountMutation.mutate(account.id);
    }
  };

  // Render logic for loading and the form UI
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        title: "가계부 리스트",
        titleAlign: "center",
      }}
    >
      <main className="p-4 space-y-8 min-h-[calc(100dvh-52px)] relative">
        <div className="text-3xl font-bold flex items-center">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="border border-gray-300 rounded-lg p-2 w-full text-right"
          />
          <span className="text-3xl ml-2 text-right">원</span>
        </div>
        <div className="flex justify-between text-center text-gray-500">
          <span
            className={`w-1/2 cursor-pointer ${
              selectedCategory === "지출" ? "font-bold text-black" : ""
            }`}
            onClick={() => handleCategoryClick("지출")}
          >
            지출
          </span>
          <span
            className={`w-1/2 cursor-pointer ${
              selectedCategory === "수입" ? "font-bold text-black" : ""
            }`}
            onClick={() => handleCategoryClick("수입")}
          >
            수입
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <Icon icon={ICON.account.shop.black} alt="장소" size={24} />
          <span>{area}</span>
        </div>
        <div className="flex items-center space-x-6">
          <Icon icon={ICON.account.card.black} alt="결제타입" size={24} />
          <div className="flex space-x-2">
            {types.map((type, i) => (
              <Badge
                key={i}
                intent={selectedType === type ? "active" : "default"}
                onClick={() => handleBadgeClick(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <Icon icon={ICON.account.memo.black} alt="메모" size={24} />
          <input
            type="text"
            value={desc}
            onChange={handleDescChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="space-x-4 absolute bottom-0 left-0 w-full">
          {account ? (
            <div>
              <button
                onClick={handleEditAccount}
                className="px-4 py-2 bg-black text-white rounded-lg w-full"
              >
                수정하기
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-white  text-black rounded-lg border w-full my-4"
              >
                삭제
              </button>
            </div>
          ) : (
            <button
              onClick={handleCreateDefaultAccount}
              className="px-4 py-2 bg-black w-full text-white rounded-lg my-4"
            >
              생성하기
            </button>
          )}
        </div>
      </main>
    </MainLayout>
  );
}
