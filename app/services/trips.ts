export async function deleteImage(id: number) {
  const { $api } = useNuxtApp();
  return await $api.delete(`/trip/images/${id}`);
}
export async function deleteTrip(id: number) {
  const { $api } = useNuxtApp();
  return await $api.delete(`/trip/${id}`);
}
export async function deleteReservation(id: number) {
  const { $api } = useNuxtApp();
  return await $api.delete(`/reservations/${id}`);
}
export async function deleteTripType(id: number) {
  const { $api } = useNuxtApp();
  return await $api.delete(`/trip-type/${id}`);
}
export async function deleteTripReview(id: number) {
  const { $api } = useNuxtApp();
  return await $api.delete(`/trip-reviews/${id}`);
}
export async function deleteSimcardReview(id: number) {
  const { $api } = useNuxtApp();
  return await $api.delete(`/simcardreviews/${id}`);
}
export async function deleteTaxiReview(id: number) {
  const { $api } = useNuxtApp();
  return await $api.delete(`/taxireviews/${id}`);
}
export async function deleteTaxiTransfer(id: number) {
  const { $api } = useNuxtApp();
  return await $api.delete(`/taxibooking/${id}`);
}
export async function deleteSimreservation(id: number) {
  const { $api } = useNuxtApp();
  return await $api.delete(`/simreservation/${id}`);
}export async function deletepackagereservation(id: number) {
  const { $api } = useNuxtApp();
  return await $api.delete(`/packagereservation/${id}`);
}
export async function deleteSimCard(id: number) {
  const { $api } = useNuxtApp();
  return await $api.delete(`/simcards/${id}`);
}
export async function deletePackage(id: number) {
  const { $api } = useNuxtApp();
  return await $api.delete(`/packages/${id}`);
}
export async function getTrips() {
  const { $api } = useNuxtApp();
  return await $api.get(`/trip`);
}
export async function getTripTypes() {
  const { $api } = useNuxtApp();
  return await $api.get("/trip-type");
}
export async function filterReservation(query: any) {
  const { $api } = useNuxtApp();
  return await $api.get("/reservations/search", {
    params: query,
  });
}
export async function addImage(id: number, param: any) {
  const { $api } = useNuxtApp();
  return await $api.patch(`/trip/${id}`, param);
}
export async function addTrip(param: any) {
  const { $api } = useNuxtApp();
  return await $api.post("/trip", param);
}
export async function addTripReview(param: any) {
  const { $api } = useNuxtApp();
  return await $api.post("/trip-reviews", param);
}
export async function addSimcardReview(param: any) {
  const { $api } = useNuxtApp();
  return await $api.post("/simcardreviews", param);
}
export async function addTaxiReview(param: any) {
  const { $api } = useNuxtApp();
  return await $api.post("/taxireviews", param);
}
export async function addPackage(param: any) {
  const { $api } = useNuxtApp();
  return await $api.post("/packages", param);
}
export async function addResvartion(param: any) {
  const { $api } = useNuxtApp();
  return await $api.post("/reservations", param);
}
export async function addTripType(param: any) {
  const { $api } = useNuxtApp();
  return await $api.post("/trip-type", param);
}
export async function addTaxiTransfer(param: any) {
  const { $api } = useNuxtApp();
  return await $api.post("/taxi", param);
}
export async function addSimCard(param: any) {
  const { $api } = useNuxtApp();
  return await $api.post("/simcards", param);
}
export async function editTrip(id: number, param: any) {
  const { $api } = useNuxtApp();
  return await $api.patch(`/trip/${id} `, param);
}
export async function editTaxiTransfer(id: number, param: any) {
  const { $api } = useNuxtApp();
  return await $api.patch(`/taxi/${id} `, param);
}
export async function editTripType(id: number, param: any) {
  const { $api } = useNuxtApp();
  return await $api.put(`/trip-type/${id} `, param);
}
export async function editPackage(id: number, param: any) {
  const { $api } = useNuxtApp();
  return await $api.put(`/packages/${id} `, param);
}
export async function edtiReviewStatus(id: number, param: any) {
  const { $api } = useNuxtApp();
  return await $api.patch(`/trip-reviews/${id} `, param);
}
export async function edtiSimcardsReviewStatus(id: number, param: any) {
  const { $api } = useNuxtApp();
  return await $api.patch(`/simcardreviews/${id} `, param);
}
export async function edtiTaxiReviewStatus(id: number, param: any) {
  const { $api } = useNuxtApp();
  return await $api.patch(`/taxireviews/${id} `, param);
}
export async function edtiReservationStatus(id: number, param: any) {
  const { $api } = useNuxtApp();
  return await $api.patch(`/reservations/${id}/status`, param);
}
export async function getTripType(id: number, param: any) {
  const { $api } = useNuxtApp();
  return await $api.get(`/trip-type`, param);
}
//faqs
export async function addTaxiFaq(param: any) {
  const { $api } = useNuxtApp();
  return await $api.post("/taxifaqs", param);
}

export async function deleteTaxiFaq(id: number) {
  const { $api } = useNuxtApp();
  return await $api.delete(`/taxifaqs/${id}`);
}
export const addFaq = async (url: string, param: any) => {
  const { $api } = useNuxtApp();
  return await $api.post(url, param);
};

export const deleteFaq = async (url: string, id: number) => {
  const { $api } = useNuxtApp();
  return await $api.delete(`${url}/${id}`);
};
