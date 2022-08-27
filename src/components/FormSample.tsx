import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

interface IFormInputs {
  firstName: string;
  age: number;
}

const schema = z.object({
  firstName: z.string().min(1),
  age: z.number().positive().int(),
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <Box>
          <FormLabel>First Name</FormLabel>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
          <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
        </Box>

        <Box>
          <FormLabel>Age</FormLabel>
          <Controller
            name="age"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
          <FormErrorMessage>{errors.age?.message}</FormErrorMessage>
        </Box>

        <Button type="submit" width="100%">
          submit
        </Button>
      </VStack>
    </form>
  );
};
