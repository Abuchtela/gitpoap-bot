// Should be the same as in gitpoap-backend/src/routes/claims.ts
type BotClaimData = {
    id: number;
    gitPOAP: { id: number; poapEventId: number; threshold: number };
    user: { githubHandle: string },
    name: string;
    imageUrl: string;
    description: string;
  };
  
export function generateComment(claims: BotClaimData[]): string {
    let qualifier: string;
    if (claims.length > 1) {
      qualifier = `some GitPOAPs`;
    } else {
      qualifier = `a GitPOAP`;
    }
  
    let comment = `Woohoo, your important contribution to this open-source project has earned you ${qualifier}!\n`;
  
    for (const claim of claims) {
        comment += `
[**${claim.name}**](https://www.gitpoap.io/gp/${claim.gitPOAP.id}):
<img alt="${claim.name} GitPOAP Badge" src="${claim.imageUrl}" height="200px">`;
    }
  
    comment +=
      '\n\nHead on over to [GitPOAP.io](https://www.gitpoap.io) and connect your GitHub account to mint!';
  
    return comment;
  }
  
export function generateIssueComment(claims: BotClaimData[]): string {
    let qualifier: string;
    if (claims.length > 1) {
      qualifier = `some GitPOAPs`;
    } else {
      qualifier = `a GitPOAP`;
    }
  
    const receivers = claims.map(claim => claim.user.githubHandle);
    const uniqueReceivers = Array.from(new Set(receivers));
    const receiversTag = uniqueReceivers.reduce((acc, receiver) => acc + `@${receiver} `, "");
    let comment = `Congrats, ${receiversTag}! You've earned ${qualifier} for your contribution!\n`;
  
    for (const claim of claims) {
      comment += `
[**${claim.name}**](https://www.gitpoap.io/gp/${claim.gitPOAP.id}):
<img alt="${claim.name} GitPOAP Badge" src="${claim.imageUrl}" height="200px">`;
    }
  
    comment +=
      '\n\nHead on over to [GitPOAP.io](https://www.gitpoap.io) and connect your GitHub account to mint if you haven’t already!';
  
    return comment;
  }