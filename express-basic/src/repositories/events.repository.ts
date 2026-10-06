import { query } from "../utils/pg.js";

export const EventRepository = {
  async findAll() {
    const result = await query(`
      select
        id,
        title,
        genre,
        description,
        start_date as "startDate",
        end_date as "endDate",
        start_time as "startTime",
        end_time as "endTime",
        location,
        city,
        price,
        image_url as "imageUrl",
        ticket_available as "ticketAvailable",
        source,
        external_id as "externalId",
        event_url as "eventUrl",
        synced_at as "syncedAt",
        created_at as "createdAt",
        updated_at as "updatedAt"
      from public.events
      order by start_date asc
    `);

    return result.rows;
  },

  async findById(id: number) {
    const result = await query(
      `
        select
          id,
          title,
          genre,
          description,
          start_date as "startDate",
          end_date as "endDate",
          start_time as "startTime",
          end_time as "endTime",
          location,
          city,
          price,
          image_url as "imageUrl",
          ticket_available as "ticketAvailable",
          source,
          external_id as "externalId",
          event_url as "eventUrl",
          synced_at as "syncedAt",
          created_at as "createdAt",
          updated_at as "updatedAt"
        from public.events
        where id = $1
      `,
      [id],
    );

    return result.rows[0] ?? null;
  },

  async create(data: {
    title: string;
    genre: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    location: string;
    city: string;
    price: number;
    imageUrl: string | null;
    ticketAvailable: boolean;
  }) {
    const result = await query(
      `
        insert into public.events (
          title,
          genre,
          description,
          start_date,
          end_date,
          start_time,
          end_time,
          location,
          city,
          price,
          image_url,
          ticket_available,
          source
        )
        values (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          $11,
          $12,
          'manual'
        )
        returning
          id,
          title,
          genre,
          description,
          start_date as "startDate",
          end_date as "endDate",
          start_time as "startTime",
          end_time as "endTime",
          location,
          city,
          price,
          image_url as "imageUrl",
          ticket_available as "ticketAvailable",
          source,
          external_id as "externalId",
          event_url as "eventUrl",
          synced_at as "syncedAt",
          created_at as "createdAt",
          updated_at as "updatedAt"
      `,
      [
        data.title,
        data.genre,
        data.description,
        data.startDate,
        data.endDate,
        data.startTime,
        data.endTime,
        data.location,
        data.city,
        data.price,
        data.imageUrl,
        data.ticketAvailable,
      ],
    );

    return result.rows[0];
  },
};
