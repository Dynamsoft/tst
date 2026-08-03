/** Shape of the MRZ payload returned by the Kotlin backend. */
export interface MrzFields {
  documentType: string;
  documentNumber: string;
  lastName: string;
  firstName: string;
  nationality: string;
  issuingState: string;
  sex: string;
  dateOfBirth: string;
  dateOfExpiry: string;
  mrzText: string;
}

export type MrzResponse =
  | { success: true; data: MrzFields }
  | { success: false; error: string };

/**
 * POST the deskewed document image to the server for authoritative MRZ reading.
 *
 * The client never parses the MRZ itself — that is the whole point of this
 * sample. Whatever the server returns is what the user sees.
 */
export async function readMrz(image: Blob): Promise<MrzResponse> {
  const form = new FormData();
  form.append("image", image, "document.jpg");

  const response = await fetch("/api/mrz", { method: "POST", body: form });

  // The backend answers with a JSON body on success *and* on its handled
  // failures (including 400/500), so parse before inspecting response.ok.
  let payload: MrzResponse;
  try {
    payload = (await response.json()) as MrzResponse;
  } catch {
    return { success: false, error: `Server returned ${response.status} with no JSON body` };
  }
  return payload;
}
