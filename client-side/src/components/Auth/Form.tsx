import { Fragment, FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormListItem } from "../../types/general.type";
import { Button, IconButton } from "../UI";

interface FormProps {
    lists: FormListItem[];
    btnTxt: string;
    onSubmit?: any;
    schema?: any;
};

const FormMessage = ({ errorMessage }: any) => {
  const message = errorMessage?.message || String(errorMessage || "");

  return (
    <>
        {message && <p className="mt-1 text-sm text-red-500">{message}</p>}
    </>
  );
};

export const Form: FunctionComponent<FormProps> = (props) => {
    const { lists, btnTxt, onSubmit, schema } = props;
    const [showPass, setShowPass] = useState(null);

    const {
        register: form,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        shouldFocusError: false,
    });    

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            {lists.map((list) => {
                return (
                    <Fragment key={list?.name}>
                        {["input", "textarea"].includes(list.type) && (
                            <fieldset>
                                <div className="flex items-baseline justify-between">
                                    <label
                                        className="mb-2 text-xs font-semibold text-secondary"
                                        htmlFor={list?.name}
                                    >
                                        {list?.label}
                                    </label>
                                </div>
                                <div className="relative px-2 py-1 border rounded border-divider focus-within:border-primary">
                                    {list.type === "input" && (
                                        <div className="flex items-center justify-between">
                                            <input
                                                {...form(list.name)}
                                                className="w-full h-10 text-sm bg-transparent text-onNeutralBg no-focus border-divider outline-0 disabled:text-secondary"
                                                {...list.props}
                                                placeholder={
                                                    list.props.placeholder || list.label
                                                }
                                                // disabled={list.props.disabled || isSubmitting}
                                                type={
                                                    list.props.type === "password"
                                                        ? showPass?.[list.name]
                                                        ? "text"
                                                        : "password"
                                                        : list.props.type
                                                }
                                            />
                                            {list.props.type === "password" && (
                                                <span className="absolute right-2 top-[50%] translate-y-[-50%]">
                                                    <IconButton
                                                        name={
                                                        !showPass?.[list.name]
                                                            ? "AiFillEyeInvisible"
                                                            : "AiFillEye"
                                                        }
                                                        iconClassName="text-onNeutralBg"
                                                        onClick={() =>
                                                            setShowPass((prevS: any) => ({
                                                                ...prevS,
                                                                [list.name]: !prevS?.[list.name],
                                                            }))
                                                        }
                                                    />
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <FormMessage errorMessage={errors?.[list.name]?.message} />
                            </fieldset>
                        )}
                    </Fragment>
                )
            })}
            <div className="flex items-center justify-start w-full hover:brightness-110">
                <Button 
                    type="submit"
                    label={btnTxt}
                    variant="contained"
                    className="w-full"
                    disabled={!isValid}
                    onClick={() => handleSubmit(onSubmit)}
                />
            </div>
        </form>
    );
};


