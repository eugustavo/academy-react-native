import { Image, IImageProps } from "native-base";

type ImageProps = IImageProps & {
  size: number;
};

export function Avatar({ size, ...rest }: ImageProps) {
  return (
    <Image
      width={size}
      height={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  )
}