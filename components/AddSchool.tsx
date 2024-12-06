"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { ImageUpload } from "./uploadImage";
import { Textarea } from "./ui/textarea";
import toast from "react-hot-toast";
import Image from "next/image";


// Define the form schema
const formSchema = z.object({
    name: z.string().min(2, {
        message: "School name must be at least 2 characters.",
    }),
    address: z.string().min(5, {
        message: "Address must be at least 5 characters.",
    }),
    city: z.string().min(2, {
        message: "City must be at least 2 characters.",
    }),
    state: z.string().min(2, {
        message: "State must be at least 2 characters.",
    }),
    contact: z.string().min(10, {
        message: "Contact number must be at least 10 characters.",
    }),
    image: z.string(),
    email_id: z.string().email({
        message: "Please enter a valid email address.",
    }),
});

export function AddSchoolPage() {
    // Set up the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            address: "",
            city: "",
            state: "",
            contact: "",
            image: "",
            email_id: "",
        },
    });

    // Define the submit handler
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const { error } = await supabase.from('schools').insert([values]);

            if (error) {
                toast.error(`Failed ${error.message}`)
                // console.error("Error inserting school:", error.message);
            } else {
                toast.success("School data added successfully")
                form.reset()
                // console.log("School added:", data);
            }
        } catch (error) {
            toast.error(`Failed ${error}`)
        }
    }

    const image = form.watch('image')

    return (
        <div className="shadow-md border rounded-md p-1 lg:p-5 m-5">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <div className="flex justify-between items-center my-5">
                        <h2 className="font-semibold text-xl  px-3">School Details</h2>
                        <Button type="submit" className="w-fit mx-5 hidden lg:inline-block lg:mt-0">Add School</Button>
                    </div>
                    <div className="border  p-2 rounded-md  m-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2   rounded-md">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>School Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter school name" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter school address" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="h-52"
                                                placeholder="School address"

                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter state" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </div>
                        <div className="flex flex-col gap-2 px-2 rounded-md overflow-hidden">
                            <FormField
                                control={form.control}
                                name="contact"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter contact number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                            <FormField
                                control={form.control}
                                name="email_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter school email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="image"

                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input className="hidden" placeholder="Enter image URL (optional)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        {
                                            image ? (
                                                <div
                                                    className="rounded-md overflow-hidden w-full h-full border border-green-500"
                                                >
                                                    <Image
                                                        src={image}
                                                        width={300}
                                                        height={300}
                                                        alt="image"
                                                        className="rounded-md"
                                                    />
                                                    <span className="text-green-500 capitalize">uploaded to database successfully</span>
                                                </div>
                                            ) : (
                                                <ImageUpload
                                                    onImageUpload={(url: string) => {
                                                        console.log("uploaded image url", url)
                                                        form.setValue("image", url)
                                                    }}
                                                />
                                            )
                                        }
                                    </FormItem>
                                )}

                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full lg:hidden mt-18 lg:mt-0">Add School</Button>
                </form>
            </Form>
        </div>
    );
}
