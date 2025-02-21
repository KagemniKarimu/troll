import { ethers } from "ethers";

class BlobService {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth");
  }

  async validateBlobTransaction(txHash: string): Promise<{
    isValidTransaction: boolean;
    hasBlobData: boolean;
    blobCount: number;
  }> {
    try {
      const tx = await this.provider.getTransaction(txHash);
      if (!tx)
        return {
          isValidTransaction: false,
          hasBlobData: false,
          blobCount: 0,
        };

      const blobHashes = tx.blobVersionedHashes || [];

      return {
        isValidTransaction: true,
        hasBlobData: blobHashes.length > 0,
        blobCount: blobHashes.length,
      };
    } catch (err) {
      const error = err as Error;
      throw new Error(`Invalid transaction hash: ${error.message}`);
    }
  }

  async getBlobTransactionDetails(txHash: string) {
    try {
      const tx = await this.provider.getTransaction(txHash);
      if (!tx) throw new Error("Transaction not found");

      const receipt = await this.provider.getTransactionReceipt(txHash);
      if (!receipt) throw new Error("Receipt not found");

      const blockNumber = tx.blockNumber || 0;
      const blockData = await this.provider.getBlock(blockNumber);

      return {
        blockNumber: tx.blockNumber,
        timestamp: blockData?.timestamp,
        blobGasUsed: receipt.blobGasUsed,
        blobGasPrice: receipt.blobGasPrice,
        maxFeePerBlobGas: tx.maxFeePerBlobGas,
        blobVersionedHashes: tx.blobVersionedHashes || [],
        totalBlobCost:
          receipt.blobGasUsed && receipt.blobGasPrice
            ? (receipt.blobGasUsed * receipt.blobGasPrice).toString()
            : "0",
        from: tx.from,
        to: tx.to,
      };
    } catch (err) {
      const error = err as Error;
      throw new Error(`Failed to fetch blob data: ${error.message}`);
    }
  }
}

export default new BlobService();
