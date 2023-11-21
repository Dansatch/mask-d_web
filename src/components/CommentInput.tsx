import { useEffect } from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "./FormInput";
import { createComment } from "../hooks/useComments";
import colors from "../config/colors";

const schema = z.object({
  text: z.string({ required_error: "Text cannot be empty" }),
  entryId: z.string(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  entryId: string;
}

const CommentInput = ({ entryId }: Props) => {
  const { register, handleSubmit, setFocus, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);

    await createComment({
      text: data.text,
      entryId: data.entryId,
    });

    setValue("text", "");
  };

  useEffect(() => {
    setFocus("text");
  }, []);

  return (
    <Box px={3} py={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack>
          <Input type="hidden" value={entryId} {...register("entryId")} />
          <FormInput
            type="text"
            hideFocusBorder={true}
            isRequired={true}
            register={register("text")}
            placeholder="Write a comment..."
            styles={{
              borderRadius: "0px",
              paddingLeft: 5,
              borderBottomWidth: "1px",
              borderColor: useColorModeValue(
                colors.lightTheme,
                colors.darkTheme
              ),
              borderStyle: "none none solid none",
            }}
          />

          <Button type="submit" borderRadius={"full"} colorScheme={"yellow"}>
            Post <ChevronRightIcon />
          </Button>
        </HStack>
      </form>
    </Box>
  );
};

export default CommentInput;
