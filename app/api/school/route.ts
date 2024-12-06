import { supabase } from '../../../lib/supabase';

export async function GET() {
    try {
        // Fetch schools from your table
        const { data: schools, error } = await supabase
            .from('schools')
            .select('*');

        if (error) {
            return new Response(
                JSON.stringify({ error: error.message }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Loop through schools and add image URL if available
        const schoolsWithImageUrls = await Promise.all(schools.map(async (school) => {
            if (school.image) {
                const { data } = await supabase.storage
                    .from('images') // Replace with your actual bucket name
                    .getPublicUrl(school.image); // Assuming `school.image` stores the file path

                if (error) {
                    console.error('Error fetching image URL:', error);
                    school.imageUrl = null; // You can choose to handle errors differently
                } else {
                    school.imageUrl = data?.publicUrl;
                }
            }

            return school;
        }));

        // Return the updated data with image URLs
        return new Response(JSON.stringify(schoolsWithImageUrls), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
