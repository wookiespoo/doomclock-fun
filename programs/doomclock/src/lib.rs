use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock::Clock;

declare_id!("YourProgramIdHere");

#[program]
pub mod doomclock {
    use super::*;

    pub fn initialize_round(ctx: Context<InitializeRound>) -> Result<()> {
        let round = &mut ctx.accounts.round;
        round.start_time = Clock::get()?.unix_timestamp;
        round.house_wallet = ctx.accounts.house_wallet.key();
        round.fee_bps = 500;
        Ok(())
    }

    pub fn place_bet(ctx: Context<PlaceBet>, amount: u64, multiplier: u64) -> Result<()> {
        let cpi_accounts = anchor_lang::system_program::Transfer {
            from: ctx.accounts.user.to_account_info(),
            to: ctx.accounts.vault.to_account_info(),
        };
        let cpi_program = ctx.accounts.system_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        anchor_lang::system_program::transfer(cpi_ctx, amount)?;
        Ok(())
    }

    pub fn vote(ctx: Context<Vote>, is_pump: bool) -> Result<()> {
        Ok(())
    }

    pub fn settle_round(ctx: Context<SettleRound>, is_pump_win: bool) -> Result<()> {
        let round = &ctx.accounts.round;
        let house_fee = ctx.accounts.total_pot * round.fee_bps as u64 / 10000;
        let seeds = &[b"house".as_ref()];
        let signer = &[&seeds[..]];
        let cpi_accounts_house = anchor_lang::system_program::Transfer {
            from: ctx.accounts.vault.to_account_info(),
            to: ctx.accounts.house_wallet.to_account_info(),
        };
        let cpi_ctx_house = CpiContext::new_with_signer(
            ctx.accounts.system_program.to_account_info(),
            cpi_accounts_house,
            signer,
        );
        anchor_lang::system_program::transfer(cpi_ctx_house, house_fee)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeRound<'info> {
    #[account(init, payer = user, space = 8 + 64)]
    pub round: Account<'info, Round>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub house_wallet: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PlaceBet<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub vault: Account<'info, Vault>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub round: Account<'info, Round>,
}

#[derive(Accounts)]
pub struct SettleRound<'info> {
    #[account(mut)]
    pub round: Account<'info, Round>,
    #[account(mut)]
    pub vault: Account<'info, Vault>,
    pub house_wallet: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Round {
    pub start_time: i64,
    pub house_wallet: Pubkey,
    pub fee_bps: u16,
}

#[account]
pub struct Vault {
    pub total_pot: u64,
}
