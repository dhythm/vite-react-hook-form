import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useNumberInput,
  VStack,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

interface IFormInputs {
  firstName: string;
  age: number;
}

const schema = z.object({
  firstName: z.string().min(1),
  age: z.preprocess((v) => Number(v), z.number().positive().int()),
});

export const FormSample = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  const { getInputProps } = useNumberInput({ step: 1 });
  const input = getInputProps();

  console.log({ errors });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Object.entries(errors).length !== 0}>
        <VStack spacing={4}>
          <Box>
            <FormLabel>First Name</FormLabel>
            <Controller
              name="firstName"
              control={control}
              // rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </Box>

          <Box>
            <FormLabel>Age</FormLabel>
            <Controller
              name="age"
              control={control}
              // rules={{ required: true }}
              render={({ field }) => <Input {...input} {...field} />}
            />
            <FormErrorMessage>{errors.age?.message}</FormErrorMessage>
          </Box>

          <Button type="submit" width="100%">
            submit
          </Button>
        </VStack>
      </FormControl>
    </form>
  );
};
