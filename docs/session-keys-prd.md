# PRD – Session Keys

## Purpose

Temporarily hold generator API credentials without persisting them.

## User Story

_As a security-conscious user, I paste my key, finish, close tab, key is gone._

## Functional Requirements

- First generation attempt opens modal asking for key.
- Key stored in memory only; cleared on tab close or refresh.
- Key can be replaced anytime.
- Visual indicator (green check) when key is set.

## Non-Functional

Modal open < 200 ms.

## Success Metrics

0 key leaks to Local Storage.

## Edge Cases

Malformed key → inline validation message.

## Pitfalls

Browser autocomplete saving keys—disable.

## Dependencies

Image & Video generation components.
