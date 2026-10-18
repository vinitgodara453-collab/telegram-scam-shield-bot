export interface ScamAnalysisResult {
  target: string;
  targetType: 'TELEGRAM_CHANNEL' | 'TELEGRAM_GROUP' | 'TELEGRAM_USER' | 'UPI_ID' | 'CRYPTO_WALLET';
  score: number;
  verdict: string;
  level: 'safe' | 'caution' | 'critical';
  flags: string[];
}

export interface PremiumEmojiItem {
  name: string;
  fallback: string;
  id: string;
  desc: string;
}

export interface CommunityReport {
  id: string;
  target: string;
  type: string;
  reason: string;
  reportedBy: string;
  proofType: string;
  timestamp: string;
  status: 'verified_scam' | 'under_review' | 'false_positive';
}

export interface VpsServiceConfig {
  botToken: string;
  adminId: string;
  channelLog: string;
  databasePath: string;
  emojiShieldId: string;
  emojiVerifiedId: string;
  emojiAlertId: string;
}

export interface VipPlan {
  id: '1m' | '2m' | 'lifetime';
  name: string;
  nameHi: string;
  price: number;
  durationDays: number;
  badge: string;
  isPopular?: boolean;
  perks: string[];
}

export interface VipSubscriber {
  userId: string;
  username: string;
  planId: '1m' | '2m' | 'lifetime';
  amount: number;
  utr: string;
  status: 'active' | 'pending' | 'expired';
  activatedAt: string;
  expiresAt: string;
}

export interface RealDetailsResult {
  category: 'BANK_IFSC' | 'IP_INTELLIGENCE' | 'MOBILE_TELECOM' | 'UPI_VPA' | 'VEHICLE_RTO' | 'DOMAIN_DNS' | 'GENERAL';
  title: string;
  status: 'success' | 'warning' | 'error';
  target: string;
  fields: { label: string; value: string; isHighlight?: boolean }[];
  riskVerdict: string;
  summary: string;
}
