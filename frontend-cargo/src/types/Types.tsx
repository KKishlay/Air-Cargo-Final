export type QuotesForm = {
  customer_name: string;
  term_of_shipment: string;
  ready_date: Date;
  origin: {
    pickup: boolean;
    custom: boolean;
    port: string;
    address: string | null;
  };
  destination: {
    pickup: boolean;
    custom: boolean;
    port: string;
    address: string | null;
  };
  dangerous: boolean;
  stackable: boolean;
  hs_code: string;
  remarks: string;
  products: {
    dimension: "cm" | "in" | "m";
    items: {
      length: number | undefined;
      height: number | undefined;
      weight: number | undefined;
      count: number | undefined;
      width: number | undefined;
    }[];
  };
};

export type GetQuotes = {
  id: string;
  booked_on: string;
  customer_id: string;
  terms_of_shipment: string;
  incoterms: string;
  origin_port: string;
  origin_address: string;
  destination_port: string;
  destination_address: string;
  door_pickup: boolean;
  door_delivery: boolean;
  origin_customs: boolean;
  destination_customs: boolean;
  cargo_ready_date: string;
  cargo_is_dangerous: boolean;
  cargo_is_stackable: boolean;
  cargo_dimension_unit: string;
  cargo_count: number;
  cargo_weight: number;
  cargo_length: number;
  cargo_height: number;
  cargo_width: number;
  cargo_hs_code: number;
  remarks: string;
  confirmed_quote: string | null;
  booking_status:
    | "Booking Confirmed"
    | "In Transit"
    | "Booking Completed"
    | "Booking Created";
};

export type SingleQuote = {
  id: string;
  currency: string;
  partner: string;
  booking_id: string;
  validity: string;
  liner: string;
  transit_days: number;
  free_days: number;
  origin_date: string;
  destination_date: string;
  charges_info: {
    name: string;
    freight: string;
    buy_rate: number;
    buy_tax: number;
    unit: number;
    sell_rate: number;
    sell_tax: number;
  }[];
  remarks: string;
  quote_status:
    | "Approval Pending"
    | "Sell Rate Pending"
    | "Approved"
    | "Rejected";
};
