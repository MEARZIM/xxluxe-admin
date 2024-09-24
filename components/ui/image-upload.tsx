"use client";

import {
    useEffect,
    useState
} from "react";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadButton } from 'next-cloudinary';
import { CldUploadWidget } from 'next-cloudinary';

import { Button } from "./button";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

export const ImageUpload = ({
    disabled,
    onChange,
    onRemove,
    value
}: ImageUploadProps) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])


    const onUpload = (url: string) => {
        if(url){
            onChange(url);
        }
    }

    if (!isMounted) {
        return null;
    }
    
    return (
        <>
            <div className="mb-4 flex items-center gap-4">
                {
                    value.map((url) => (
                        <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                            <div className="z-10 absolute top-2 right-2">
                                <Button type="button" onClick={() => onRemove(url)} variant={"destructive"}>
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </div>
                            <Image
                                src={url}
                                alt={"BillBoard Image"}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))
                }
            </div>
            <CldUploadWidget uploadPreset="ljd55qru"
                onSuccess={(result: any, { widget }) => {
                    onUpload(result.info.secure_url);  // { public_id, secure_url, etc }
                }}
                onQueuesEnd={(result, { widget }) => {
                    widget.close();
                }}
            >
                {({ open }) => {
                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant={"secondary"}
                            onClick={() => open()}
                        >
                            <ImagePlus className="w-4 h-4 mr-2" /> Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget>


        </>
    )
}


