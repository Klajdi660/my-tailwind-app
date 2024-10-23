import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Icon } from "../UI";
import { useAppSelector } from "../../store";
import { AddressDetailsProps } from "../../types";

export const AddressDetails: FunctionComponent<AddressDetailsProps> = () => {
  const { user } = useAppSelector((state) => state.user);

  const { city, address, country, postalCode } = user.extra;

  const navigate = useNavigate();

  const handleMenuClick = async (data: any) => {
    try {
    } catch (error) {
      console.error(`Failed to update personal details! ${error}`);
    }
  };

  const {
    register: form,
    handleSubmit,
    // control,
  } = useForm({
    mode: "onTouched",
  });

  return (
    <>
      <h5 className="text-lg font-semibold">Address Details</h5>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(handleMenuClick)}
      >
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[48%]">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Country
            </label>
            <div className="relative">
              <input
                {...form("country")}
                name="country"
                className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                type="text"
                placeholder="Enter country"
                autoComplete="country"
                defaultValue={country}
              />
              <Icon
                name="TiLocationArrowOutline"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary"
              />
            </div>
          </div>
          <div className="w-full md:w-[48%]">
            <label className="block text-secondary text-xs font-semibold mb-2">
              City
            </label>
            <div className="relative">
              <input
                {...form("city")}
                name="city"
                className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                type="text"
                placeholder="Enter city"
                autoComplete="city"
                defaultValue={city}
              />
              <Icon
                name="MdOutlineLocationSearching"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[48%]">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Address Line
            </label>
            <div className="relative">
              <input
                {...form("address")}
                name="address"
                className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                type="text"
                placeholder="Enter address"
                autoComplete="address"
                defaultValue={address}
              />
              <Icon
                name="HiOutlineLocationMarker"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary"
              />
            </div>
          </div>
          <div className="w-full md:w-[48%]">
            <label className="block text-secondary text-xs font-semibold mb-2">
              Postal Code
            </label>
            <div className="relative">
              <input
                {...form("postalCode")}
                name="postalCode"
                className="w-full h-12 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0"
                type="text"
                placeholder="Enter postal code"
                autoComplete="postalCode"
                defaultValue={postalCode}
              />
              <Icon
                name="BsSignpostSplit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button
            type="submit"
            label="Cancel"
            variant="outlined"
            onClick={() => {
              navigate("/profile");
            }}
          />
          <Button type="submit" label="Save" variant="contained" />
        </div>
      </form>
    </>
  );
};
