// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.4;

interface IMerlinSwapMintCallback {

    /// @notice Called to msg.sender in MerlinSwapPool#mint call
    /// @param x Amount of tokenX need to pay from miner
    /// @param y Amount of tokenY need to pay from miner
    /// @param data Any data passed through by the msg.sender via the MerlinSwapPool#mint call
    function mintDepositCallback(
        uint256 x,
        uint256 y,
        bytes calldata data
    ) external;

}

interface IMerlinSwapCallback {

    /// @notice Called to msg.sender in MerlinSwapPool#swapY2X(DesireX) call
    /// @param x Amount of tokenX trader will acquire
    /// @param y Amount of tokenY trader will pay
    /// @param data Any dadta passed though by the msg.sender via the MerlinSwapPool#swapY2X(DesireX) call
    function swapY2XCallback(
        uint256 x,
        uint256 y,
        bytes calldata data
    ) external;

    /// @notice Called to msg.sender in MerlinSwapPool#swapX2Y(DesireY) call
    /// @param x Amount of tokenX trader will pay
    /// @param y Amount of tokenY trader will require
    /// @param data Any dadta passed though by the msg.sender via the MerlinSwapPool#swapX2Y(DesireY) call
    function swapX2YCallback(
        uint256 x,
        uint256 y,
        bytes calldata data
    ) external;

}

interface IMerlinSwapAddLimOrderCallback {

    /// @notice Called to msg.sender in MerlinSwapPool#addLimOrderWithX(Y) call
    /// @param x Amount of tokenX seller will pay
    /// @param y Amount of tokenY seller will pay
    /// @param data Any dadta passed though by the msg.sender via the MerlinSwapPool#addLimOrderWithX(Y) call
    function payCallback(
        uint256 x,
        uint256 y,
        bytes calldata data
    ) external;

}