const delay = (ms: number = 600) => new Promise((res) => setTimeout(res, ms));

export const mockPredictionService = {
  async getPredictions() {
    await delay();
    // TODO: Implement prediction mock data when API spec is ready
    return { items: [], total: 0 };
  },

  async submitPrediction(_payload: { matchId: string; prediction: string }) {
    await delay();
    return { success: true, message: 'Prediction submitted' };
  },
};
