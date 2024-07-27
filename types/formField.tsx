export type FormFieldProps = {
    title: string;
    value: string;
    handleChangeText: (text: string) => void;
    placeholder?: string;  // Include placeholder if it's optional
    otherStyles?: string;  
    keyBoardType?: string;  // Include keyBoardType if it's optional

}